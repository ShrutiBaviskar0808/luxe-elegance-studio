import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen, products, setQuickView } = useShop();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products.slice(0, 6);
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        (p.badge ?? "").toLowerCase().includes(s),
    );
  }, [q, products]);

  const suggestions = ["Earrings", "Rings", "Necklaces", "Bracelets", "Bestseller", "New"];

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
            className="fixed inset-0 z-[90] bg-onyx/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-0 top-0 z-[91] bg-background shadow-luxe max-h-[100vh] overflow-y-auto"
          >
            <div className="mx-auto max-w-5xl px-6 py-6">
              <div className="flex items-center gap-4 border-b border-foreground/15 pb-4">
                <Search className="h-5 w-5 text-gold" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name or category…"
                  className="flex-1 bg-transparent outline-none font-serif text-2xl sm:text-3xl placeholder:text-foreground/30"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-full hover:bg-foreground/5"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQ(s)}
                    className="rounded-full border border-foreground/15 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] hover:border-gold hover:text-gold transition"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {q ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Trending"}
                </p>
                {results.length === 0 ? (
                  <p className="mt-8 text-center text-muted-foreground py-12">
                    No matches. Try a different keyword.
                  </p>
                ) : (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {results.slice(0, 9).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuickView(p);
                        }}
                        className="group flex items-center gap-4 rounded-2xl p-3 hover:bg-cream transition text-left"
                      >
                        <div className="h-16 w-16 rounded-xl overflow-hidden bg-cream shrink-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                            {p.category}
                          </p>
                          <p className="font-serif text-lg leading-tight truncate">{p.name}</p>
                          <p className="text-xs text-gold">₹ {p.price.toLocaleString()}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-0.5 transition" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
