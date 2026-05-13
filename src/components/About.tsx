import { motion } from "framer-motion";
import { Gem, Hammer, Leaf, ShieldCheck } from "lucide-react";

const stats = [
  { v: "27+", l: "Years of craft" },
  { v: "12k", l: "Collectors" },
  { v: "100%", l: "Conflict-free" },
  { v: "48", l: "Master jewellers" },
];

const features = [
  { icon: Hammer, t: "Hand-finished", d: "Every piece is set, polished and inspected by hand in our atelier." },
  { icon: Gem, t: "Rare stones", d: "Ethically sourced diamonds, emeralds, and South Sea pearls." },
  { icon: Leaf, t: "Recycled gold", d: "All pieces cast from 100% recycled 18K & 22K solid gold." },
  { icon: ShieldCheck, t: "Lifetime care", d: "Complimentary cleaning, re-plating, and re-sizing forever." },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36 bg-gradient-ivory overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-gold/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-luxe">
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85"
              alt="Atelier craftsmanship"
              className="h-[560px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/30 via-transparent to-transparent" />
          </div>
          <div className="float-slow hidden sm:block absolute -bottom-10 -right-6 w-56 rounded-2xl overflow-hidden shadow-luxe">
            <img
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80"
              alt="Artisan hand"
              className="h-56 w-full object-cover"
            />
          </div>
          <div className="absolute -top-6 -left-6 glass rounded-2xl px-5 py-4 shadow-luxe">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Est.</p>
            <p className="font-display text-3xl">1998</p>
          </div>
        </motion.div>

        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.35em] text-gold"
          >
            Our Story
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display text-5xl sm:text-6xl leading-[0.95] text-balance"
          >
            Heirlooms made for the women who <em className="not-italic text-gradient-gold">write the future</em>.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-xl text-muted-foreground leading-relaxed"
          >
            Maison Or began as a single bench in a small Jaipur atelier. Three
            generations later, our jewellers still set every stone by hand —
            blending old-world technique with modern, weightless silhouettes
            designed to be worn every single day.
          </motion.p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.l}>
                <p className="font-display text-4xl text-gradient-gold">{s.v}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="group rounded-2xl p-5 glass hover:shadow-soft transition"
              >
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-gradient-gold text-onyx shadow-glow">
                  <f.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 font-serif text-xl">{f.t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
