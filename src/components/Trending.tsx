import { motion } from "framer-motion";
import { trending } from "@/data/products";
import ProductCard from "./ProductCard";

export default function Trending() {
  return (
    <section id="trending" className="relative py-28 sm:py-32 bg-cream overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 -right-40 h-[460px] w-[460px] rounded-full bg-gold/20 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.35em] text-gold"
          >
            Trending Now
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 font-display text-4xl sm:text-5xl leading-[0.95] text-balance"
          >
            Most <em className="not-italic text-gradient-gold">Loved</em>
          </motion.h2>
        </div>

        <div className="grid gap-6 sm:gap-7 grid-cols-2 lg:grid-cols-4">
          {trending.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
