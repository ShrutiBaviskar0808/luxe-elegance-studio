import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Check } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function QuickViewModal() {
  const { quickView, setQuickView, addToCart, toggleWishlist, isWished, setCartOpen } = useShop();

  const p = quickView;
  const wished = p ? isWished(p.id) : false;

  return (
    <AnimatePresence>
      {p && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
            className="fixed inset-0 z-[95] bg-onyx/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[96] grid place-items-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto relative w-full max-w-4xl bg-background rounded-[2rem] overflow-hidden shadow-luxe grid md:grid-cols-2 max-h-[92vh]">
              <button
                onClick={() => setQuickView(null)}
                className="absolute top-4 right-4 z-10 h-10 w-10 grid place-items-center rounded-full glass hover:text-gold transition"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-square md:aspect-auto md:h-full bg-cream overflow-hidden">
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                {p.badge && (
                  <span className="absolute top-4 left-4 rounded-full bg-gradient-gold text-onyx px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] font-medium">
                    {p.badge}
                  </span>
                )}
              </div>

              <div className="p-7 sm:p-10 flex flex-col overflow-y-auto">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{p.category}</p>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl leading-tight">{p.name}</h3>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-gold">
                    ₹ {p.price.toLocaleString()}
                  </span>
                  {p.oldPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹ {p.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                  Hand-finished in our atelier from 18K solid gold and conflict-free stones.
                  Designed to be lived in, layered, and treasured for generations.
                </p>

                <ul className="mt-6 space-y-2 text-sm">
                  {[
                    "18K solid gold · Hallmarked",
                    "Conflict-free natural stones",
                    "Lifetime care & complimentary polishing",
                    "Ships in 3–5 days · Free worldwide",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-foreground/80">
                      <Check className="h-3.5 w-3.5 text-gold" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      addToCart(p.id);
                      setQuickView(null);
                      setCartOpen(true);
                    }}
                    className="shine flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-4 text-[11px] uppercase tracking-[0.3em] hover:opacity-90 transition"
                  >
                    <ShoppingBag className="h-4 w-4" /> Add to Bag
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    aria-label="Wishlist"
                    className={`h-14 w-14 grid place-items-center rounded-full border transition ${
                      wished
                        ? "bg-gold/15 border-gold text-gold"
                        : "border-foreground/15 hover:border-gold hover:text-gold"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${wished ? "fill-current" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
