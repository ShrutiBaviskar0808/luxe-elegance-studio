import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag } from "lucide-react";
import { useShop, getProductById } from "@/context/ShopContext";

export default function WishlistDrawer() {
  const { wishlistOpen, setWishlistOpen, wishlist, toggleWishlist, addToCart, setCartOpen } =
    useShop();

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 z-[80] bg-onyx/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.45 }}
            className="fixed right-0 top-0 z-[81] h-full w-full sm:w-[440px] bg-background shadow-luxe flex flex-col"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-gold" />
                <p className="text-[11px] uppercase tracking-[0.3em]">
                  Wishlist · {wishlist.length}
                </p>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="p-2 rounded-full hover:bg-foreground/5"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                  <div className="h-16 w-16 grid place-items-center rounded-full bg-cream">
                    <Heart className="h-6 w-6 text-gold" />
                  </div>
                  <p className="font-display text-2xl">Save your favourites.</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Tap the heart on any piece to keep it close.
                  </p>
                </div>
              ) : (
                <ul className="space-y-5">
                  {wishlist.map((id) => {
                    const p = getProductById(id);
                    if (!p) return null;
                    return (
                      <motion.li
                        key={id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        className="flex gap-4"
                      >
                        <div className="h-24 w-20 rounded-xl overflow-hidden bg-cream shrink-0">
                          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                            {p.category}
                          </p>
                          <h4 className="font-serif text-lg leading-tight truncate">{p.name}</h4>
                          <p className="text-sm text-gold mt-0.5">₹ {p.price.toLocaleString()}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              onClick={() => {
                                addToCart(p.id);
                                setWishlistOpen(false);
                                setCartOpen(true);
                              }}
                              className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-3.5 py-2 text-[10px] uppercase tracking-[0.25em]"
                            >
                              <ShoppingBag className="h-3 w-3" /> Add
                            </button>
                            <button
                              onClick={() => toggleWishlist(p.id)}
                              className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-destructive"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
