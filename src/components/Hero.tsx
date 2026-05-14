import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.png";

const slides = [hero3, hero2, hero4, hero1, hero5];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative w-full overflow-hidden bg-gradient-cinematic">
      <div className="relative h-[78vh] min-h-[520px] sm:h-[88vh] sm:min-h-[640px] w-full">
        <AnimatePresence mode="sync">
          <motion.img
            key={slides[i]}
            src={slides[i]}
            alt="PIPA Jewellery editorial"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        {/* content */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end sm:items-center px-6 pb-16 sm:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-xl text-ivory"
          >
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.45em] text-ivory/85">
              PIPA Jewellery
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] tracking-tight">
              Luxury Jewellery
              <br />
              <em className="not-italic text-gradient-gold">Collection</em>
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#new-arrival"
                className="group inline-flex items-center gap-2 rounded-full bg-ivory text-onyx px-7 py-3.5 text-[11px] uppercase tracking-[0.28em] hover:bg-gold hover:text-onyx transition shadow-luxe"
              >
                Shop Now
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#collections"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/60 text-ivory px-7 py-3.5 text-[11px] uppercase tracking-[0.28em] hover:bg-ivory hover:text-onyx transition"
              >
                Explore Collection
              </a>
            </div>
          </motion.div>
        </div>

        {/* slide indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Slide ${k + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                k === i ? "w-10 bg-ivory" : "w-4 bg-ivory/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
