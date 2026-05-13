import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";

const HERO = "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1600&q=85";
const SIDE_1 = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80";
const SIDE_2 = "https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=900&q=80";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-cinematic pt-32 pb-20">
      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-gold/30 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-champagne/40 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-12 gap-10 items-center">
        {/* LEFT - copy */}
        <div className="lg:col-span-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.28em]"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            New Winter Edit · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-8 font-display text-[clamp(3.2rem,7.5vw,6.5rem)] leading-[0.95] tracking-tight text-balance"
          >
            Timeless <em className="not-italic text-gradient-gold">brilliance</em>,
            <br /> sculpted in light.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            Hand-finished fine jewelry crafted in our atelier — heirloom pieces
            designed to be lived in, layered, and loved for generations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
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
              href="#collections"
              className="inline-flex items-center gap-3 rounded-full border border-foreground/20 px-7 py-4 text-xs uppercase tracking-[0.25em] hover:border-foreground/60 transition"
            >
              Explore New Arrivals
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span>Loved by 12,000+ collectors worldwide</span>
          </motion.div>
        </div>

        {/* RIGHT - layered images */}
        <div className="lg:col-span-6 relative h-[520px] sm:h-[620px] lg:h-[680px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute right-0 top-4 w-[78%] h-[88%] rounded-[2rem] overflow-hidden shadow-luxe"
          >
            <img src={HERO} alt="Luxury jewelry hero" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-onyx/40 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.25 }}
            className="float-slow absolute left-0 top-24 w-[44%] h-[42%] rounded-[1.5rem] overflow-hidden glass shadow-luxe"
          >
            <img src={SIDE_1} alt="Diamond ring" className="h-full w-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="float-slow absolute left-6 bottom-2 w-[48%] h-[34%] rounded-[1.5rem] overflow-hidden shadow-luxe"
            style={{ animationDelay: "1.5s" }}
          >
            <img src={SIDE_2} alt="Gold necklace" className="h-full w-full object-cover" />
          </motion.div>

          {/* floating spec card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55 }}
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
      <div className="relative mt-20 overflow-hidden border-y border-foreground/10 py-5">
        <div className="marquee flex gap-16 whitespace-nowrap font-display text-2xl sm:text-3xl text-foreground/60">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16">
              {["Hand crafted", "·", "18K Gold", "·", "Conflict-free diamonds", "·", "Lifetime care", "·", "Made in atelier", "·"].map(
                (w, i) => (
                  <span key={i} className="italic">{w}</span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
