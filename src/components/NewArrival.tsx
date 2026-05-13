import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { useShop } from "@/context/ShopContext";

const TABS = ["All", "Earrings", "Rings", "Necklaces", "Bracelets"] as const;

export default function NewArrival() {
  const { products, category, setCategory } = useShop();

  const list = useMemo(() => {
    const filtered = category === "All" ? products : products.filter((p) => p.category === category);
    return filtered.slice(0, 9);
  }, [products, category]);

  return (
    <section
      id="new-arrival"
      className="relative py-28 sm:py-36 bg-gradient-ivory overflow-hidden scroll-mt-24"
    >
      <div className="pointer-events-none absolute top-1/3 -right-32 h-[480px] w-[480px] rounded-full bg-gold/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
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
          <a
            href="#collections"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] hover:text-gold transition"
          >
            View all collections
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = category === t;
            return (
              <button
                key={t}
                onClick={() => setCategory(t)}
                className={`rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] transition border ${
                  active
                    ? "bg-foreground text-background border-foreground shadow-soft"
                    : "border-foreground/15 hover:border-gold hover:text-gold"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {list.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            No pieces in this edit yet — check back soon.
          </p>
        ) : (
          <motion.div
            layout
            className="grid gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-3"
          >
            {list.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
