import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";

type Cat = "Earrings" | "Rings" | "Necklaces" | "Bracelets";

const collections: { name: Cat; tag: string; image: string; span: string }[] = [
  {
    name: "Earrings",
    tag: "32 pieces",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1200&q=80",
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    name: "Bracelets",
    tag: "18 pieces",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
    span: "lg:col-span-5",
  },
  {
    name: "Rings",
    tag: "26 pieces",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
    span: "lg:col-span-5",
  },
  {
    name: "Necklaces",
    tag: "22 pieces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    span: "lg:col-span-12",
  },
];

export default function Collections() {
  const { setCategory } = useShop();
  const goTo = (cat: Cat) => {
    setCategory(cat);
    document.getElementById("new-arrival")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section id="collections" className="relative py-28 sm:py-36 bg-cream overflow-hidden scroll-mt-24">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-[420px] w-[420px] rounded-full bg-champagne/40 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Curated Edits</p>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-balance">
            The Maison <em className="not-italic text-gradient-gold">collections</em>.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-xl">
            Four signature edits — each conceived in our atelier and refined over
            months of stone-setting, polishing, and patient craft.
          </p>
        </div>

        <div className="grid gap-5 lg:gap-6 grid-cols-1 lg:grid-cols-12 auto-rows-[260px] lg:auto-rows-[280px]">
          {collections.map((c, i) => (
            <motion.button
              key={c.name}
              type="button"
              onClick={() => goTo(c.name)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-[2rem] shadow-soft hover:shadow-luxe transition-all duration-500 text-left ${c.span}`}
            >
              <img
                src={c.image}
                alt={c.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/85 via-onyx/25 to-transparent" />
              <div className="absolute inset-0 p-7 sm:p-9 flex flex-col justify-between text-background">
                <div className="flex items-start justify-between">
                  <span className="glass-dark rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-ivory">
                    {c.tag}
                  </span>
                  <span className="h-10 w-10 grid place-items-center rounded-full glass-dark text-ivory transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/70">Collection</p>
                  <h3 className="mt-1 font-display text-4xl sm:text-5xl lg:text-6xl text-ivory">
                    {c.name}
                  </h3>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
