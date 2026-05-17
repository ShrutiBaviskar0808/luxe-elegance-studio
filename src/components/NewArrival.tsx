import { useMemo } from "react";
import { motion } from "framer-motion";
import { useShop } from "@/context/ShopContext";
import ProductCarousel from "./ProductCarousel";

const TABS = ["All", "Earrings", "Rings", "Necklaces", "Bracelets"] as const;

export default function NewArrival() {
  const { products, category, setCategory } = useShop();

  const list = useMemo(() => {
    return category === "All" ? products : products.filter((p) => p.category === category);
  }, [products, category]);

  return (
    <section id="new-arrival" className="relative bg-gradient-ivory scroll-mt-24 pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold"
          >
            The New Arrival
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl leading-[0.95]"
          >
            New <em className="not-italic text-gradient-gold">Arrivals</em>
          </motion.h2>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => {
            const active = category === t;
            return (
              <button
                key={t}
                onClick={() => setCategory(t)}
                className={`rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-[10px] uppercase tracking-[0.28em] transition border ${
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
      </div>

      <ProductCarousel
        key={category}
        products={list}
        bg="ivory"
      />
    </section>
  );
}
