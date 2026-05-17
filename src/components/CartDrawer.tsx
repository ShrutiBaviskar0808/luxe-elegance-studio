import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useShop, getProductById } from "@/context/ShopContext";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQty, removeFromCart, cartSubtotal, setCheckoutOpen } =
    useShop();

  const startCheckout = () => {
    setCartOpen(false);
    setTimeout(() => setCheckoutOpen(true), 200);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[80] bg-onyx/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.45 }}
            className="fixed right-0 top-0 z-[81] h-full w-full sm:w-[440px] bg-background shadow-luxe flex flex-col"
            aria-label="Shopping bag"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-gold" />
                <p className="text-[11px] uppercase tracking-[0.3em]">Your Bag · {cart.length}</p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-foreground/5"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                  <div className="h-16 w-16 grid place-items-center rounded-full bg-cream">
                    <ShoppingBag className="h-6 w-6 text-gold" />
                  </div>
                  <p className="font-display text-2xl">Your bag is waiting.</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Discover hand-finished pieces designed to be lived in.
                  </p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-2 rounded-full bg-foreground text-background px-6 py-3 text-[11px] uppercase tracking-[0.25em]"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {cart.map((c) => {
                    const p = getProductById(c.id);
                    if (!p) return null;
                    return (
                      <motion.li
                        key={c.id}
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
                          <p className="text-sm text-gold mt-0.5">
                            ₹ {(p.price * c.qty).toLocaleString()}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="inline-flex items-center border border-foreground/15 rounded-full">
                              <button
                                onClick={() => setQty(c.id, c.qty - 1)}
                                className="p-2 hover:text-gold"
                                aria-label="Decrease"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-3 text-sm tabular-nums">{c.qty}</span>
                              <button
                                onClick={() => setQty(c.id, c.qty + 1)}
                                className="p-2 hover:text-gold"
                                aria-label="Increase"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(c.id)}
                              className="p-2 text-muted-foreground hover:text-destructive"
                              aria-label="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <footer className="border-t border-foreground/10 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-serif text-2xl text-gold">
                    ₹ {cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping & taxes calculated at checkout. Complimentary gift packaging included.
                </p>
                <button
                  onClick={startCheckout}
                  className="shine block w-full text-center rounded-full bg-foreground text-background py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gradient-gold hover:text-onyx transition-all shadow-luxe hover:shadow-glow"
                >
                  Secure Checkout →
                </button>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
