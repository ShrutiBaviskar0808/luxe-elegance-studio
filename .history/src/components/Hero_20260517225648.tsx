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

        {/* content overlay removed */}

        {/* slide indicators */
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
