import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function NewArrival() {
  const waMessage = (name: string) =>
    `https://wa.me/919999999999?text=${encodeURIComponent(`Hi Maison Or, I'd like to order: ${name}`)}`;

  return (
    <section id="new-arrival" className="relative py-28 sm:py-36 bg-gradient-ivory overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full bg-gold/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.35em] text-gold"
            >
              The New Arrival
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-balance"
            >
              Pieces of <em className="not-italic text-gradient-gold">quiet luxury</em>.
            </motion.h2>
          </div>
          <motion.a
            href="#collections"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] hover:text-gold transition"
          >
            View all collections
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="group relative rounded-[2rem] overflow-hidden bg-card shadow-soft hover:shadow-luxe transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx/55 via-onyx/0 to-transparent opacity-80 group-hover:opacity-100 transition" />
                <span className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.25em]">
                  {p.category}
                </span>
                <span className="absolute top-4 right-4 rounded-full bg-gradient-gold px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-onyx font-medium shadow-glow">
                  New
                </span>

                {/* shine sweep */}
                <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>

              <div className="p-6 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl leading-tight">{p.name}</h3>
                  <p className="mt-1 text-sm text-gold font-medium">₹ {p.price.toLocaleString()}</p>
                </div>
                <a
                  href={waMessage(p.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] hover:bg-gold-deep transition"
                >
                  Order on WhatsApp
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
