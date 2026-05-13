import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";

const slides = [
  {
    eyebrow: "New Festive Edit · 2026",
    title: ["Timeless elegance,", "crafted for every", "woman."],
    sub: "Discover handcrafted luxury jewellery designed to elevate your everyday style.",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1600&q=85",
    side1:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
    side2:
      "https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "The Atelier · Edit 02",
    title: ["Sculpted in light,", "loved for", "generations."],
    sub: "Hand-finished 18K solid gold pieces — designed to be lived in, layered, and treasured.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=85",
    side1:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
    side2:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  const s = slides[i];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] overflow-hidden bg-gradient-cinematic pt-10 pb-16"
    >
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gold/30 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-champagne/40 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.eyebrow}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[10px] uppercase tracking-[0.3em]"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              {s.eyebrow}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={s.title.join("-")}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.8 }}
              className="mt-7 font-display text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.95] tracking-tight text-balance"
            >
              {s.title[0]}
              <br />
              <em className="not-italic text-gradient-gold">{s.title[1]}</em>
              <br />
              {s.title[2]}
            </motion.h1>
          </AnimatePresence>

          <motion.p
            key={s.sub}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            {s.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#new-arrival"
              className="shine group inline-flex items-center gap-3 rounded-full bg-foreground text-background px-7 py-4 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition shadow-luxe"
            >
              Shop Collection
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#new-arrival"
              className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-4 text-xs uppercase tracking-[0.25em] hover:border-foreground/60 transition"
            >
              Explore New Arrivals
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span>Loved by 12,000+ women worldwide</span>
          </motion.div>

          {/* Dots */}
          <div className="mt-10 flex items-center gap-2">
            {slides.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-1.5 rounded-full transition-all ${
                  k === i ? "w-10 bg-foreground" : "w-4 bg-foreground/25"
                }`}
                aria-label={`Slide ${k + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT - layered images */}
        <div className="lg:col-span-6 relative h-[500px] sm:h-[600px] lg:h-[660px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.image}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute right-0 top-4 w-[78%] h-[88%] rounded-[2rem] overflow-hidden shadow-luxe"
            >
              <img src={s.image} alt="Luxury jewelry" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="float-slow absolute left-0 top-24 w-[44%] h-[40%] rounded-[1.5rem] overflow-hidden glass shadow-luxe"
          >
            <img src={s.side1} alt="Detail" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="float-slow absolute left-6 bottom-2 w-[48%] h-[34%] rounded-[1.5rem] overflow-hidden shadow-luxe"
            style={{ animationDelay: "1.5s" }}
          >
            <img src={s.side2} alt="Detail" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute right-4 bottom-6 glass rounded-2xl p-4 w-56 shadow-luxe"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Bestseller</p>
            <p className="mt-1 font-serif text-lg leading-tight">Aurelia Drop Earrings</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gold font-medium">₹ 8,400</span>
              <span className="rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.2em] px-3 py-1.5">
                Shop
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* marquee */}
      <div className="relative mt-16 overflow-hidden border-y border-foreground/10 py-5">
        <div className="marquee flex gap-16 whitespace-nowrap font-display text-2xl sm:text-3xl text-foreground/60">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16">
              {[
                "Hand crafted",
                "·",
                "18K Solid Gold",
                "·",
                "Conflict-free diamonds",
                "·",
                "Lifetime care",
                "·",
                "Made with love",
                "·",
              ].map((w, idx) => (
                <span key={idx} className="italic">
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
