import { motion } from "framer-motion";

const stats = [
  { v: "27+", l: "Years of craft" },
  { v: "12k", l: "Collectors" },
  { v: "100%", l: "Conflict-free" },
  { v: "48", l: "Master jewellers" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-gradient-ivory overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-gold/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-luxe">
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85"
              alt="Atelier craftsmanship"
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/30 via-transparent to-transparent" />
          </div>
          <div className="absolute -top-6 -left-6 glass rounded-2xl px-5 py-4 shadow-luxe">
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Est.</p>
            <p className="font-display text-3xl">1998</p>
          </div>
        </motion.div>

        <div className="lg:col-span-6">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Our Story</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl leading-[0.95] text-balance">
            Heirlooms <em className="not-italic text-gradient-gold">made to last</em>.
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.l}>
                <p className="font-display text-4xl text-gradient-gold">{s.v}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

