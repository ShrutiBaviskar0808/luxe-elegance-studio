import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.png";

const slides = [
  {
    eyebrow: "New Festive Edit · 2026",
    main: hero3,
    side1: hero5,
    side2: hero4,
    badge: { name: "Lip Couture Drops", price: "₹ 12,400" },
  },
  {
    eyebrow: "The Atelier · Edit 02",
    main: hero2,
    side1: hero1,
    side2: hero4,
    badge: { name: "Orchid Bloom Studs", price: "₹ 8,900" },
  },
  {
    eyebrow: "Signature · Heirloom Bangles",
    main: hero4,
    side1: hero3,
    side2: hero5,
    badge: { name: "Rosé Heirloom Cuff", price: "₹ 18,600" },
  },
];

const TITLE = ["PIPA Jewellery —", "Timeless elegance", "for every moment."];
const SUB =
  "Handcrafted luxury jewellery designed to celebrate elegance, femininity, and modern sophistication.";

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

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-7 font-display text-[clamp(2.6rem,6.5vw,5.6rem)] leading-[0.95] tracking-tight text-balance"
          >
            {TITLE[0]}
            <br />
            <em className="not-italic text-gradient-gold">{TITLE[1]}</em>
            <br />
            {TITLE[2]}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            {SUB}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#collections"
              className="shine group inline-flex items-center gap-3 rounded-full bg-foreground text-background px-7 py-4 text-xs uppercase tracking-[0.25em] hover:bg-foreground/90 transition shadow-luxe hover:shadow-[0_18px_50px_-10px_rgba(184,148,82,0.55)]"
            >
              Explore Collection
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#new-arrival"
              className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-4 text-xs uppercase tracking-[0.25em] hover:border-foreground/60 hover:bg-foreground/5 transition"
            >
              Shop New Arrivals
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
        <div className="lg:col-span-6 relative h-[520px] sm:h-[620px] lg:h-[680px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.main}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="group absolute right-0 top-4 w-[78%] h-[88%] rounded-[2rem] overflow-hidden shadow-luxe"
            >
              <img
                src={s.main}
                alt="Signature luxury jewellery editorial"
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/50 via-transparent to-transparent" />
              <div className="absolute left-5 top-5 rounded-full glass px-3 py-1.5 text-[10px] uppercase tracking-[0.3em]">
                Atelier Edit
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={"s1-" + s.side1}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="float-slow absolute left-0 top-20 w-[44%] h-[40%] rounded-[1.5rem] overflow-hidden glass shadow-luxe"
            >
              <img src={s.side1} alt="Jewellery detail" className="h-full w-full object-cover" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={"s2-" + s.side2}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="float-slow absolute left-6 bottom-2 w-[48%] h-[34%] rounded-[1.5rem] overflow-hidden shadow-luxe"
              style={{ animationDelay: "1.5s" }}
            >
              <img src={s.side2} alt="Bangle close up" className="h-full w-full object-cover" />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={"badge-" + s.badge.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute right-4 bottom-6 glass rounded-2xl p-4 w-56 shadow-luxe"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Featured
              </p>
              <p className="mt-1 font-serif text-lg leading-tight">{s.badge.name}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-gold font-medium">{s.badge.price}</span>
                <a
                  href="#new-arrival"
                  className="rounded-full bg-foreground text-background text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 hover:bg-foreground/90 transition"
                >
                  Shop
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
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
