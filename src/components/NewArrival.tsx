import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { newArrivals, products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function NewArrival() {
  // Show 6 cards: new arrivals first, then a few more
  const list = [...newArrivals, ...products.filter((p) => !newArrivals.includes(p))].slice(0, 6);

  return (
    <section
      id="new-arrival"
      className="relative py-28 sm:py-36 bg-gradient-ivory overflow-hidden"
    >
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

        <div className="grid gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
