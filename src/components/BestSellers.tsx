import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { bestSellers } from "@/data/products";
import ProductCard from "./ProductCard";

export default function BestSellers() {
  return (
    <section id="best-sellers" className="relative py-28 sm:py-32 bg-background overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 h-[440px] w-[440px] rounded-full bg-champagne/40 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.35em] text-gold"
            >
              The Bestsellers
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 font-display text-5xl sm:text-6xl leading-[0.95] text-balance"
            >
              Loved by every <em className="not-italic text-gradient-gold">PIPA</em> woman.
            </motion.h2>
          </div>
          <a
            href="#new-arrival"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] hover:text-gold transition"
          >
            Shop bestsellers
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid gap-6 sm:gap-7 grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
