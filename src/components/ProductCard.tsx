import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";

const badgeColor: Record<string, string> = {
  New: "bg-gradient-gold text-onyx",
  Bestseller: "bg-onyx text-ivory",
  Limited: "bg-bronze text-ivory",
  Trending: "bg-champagne text-onyx",
};

export default function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const { addToCart, toggleWishlist, isWished, setQuickView, setCartOpen } = useShop();
  const wished = isWished(p.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: "easeOut" }}
      className="group relative rounded-[1.75rem] overflow-hidden bg-card shadow-soft hover:shadow-luxe transition-all duration-500 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <button
          type="button"
          onClick={() => setQuickView(p)}
          className="absolute inset-0 z-[1]"
          aria-label={`Quick view ${p.name}`}
        />
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/45 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition" />

        {p.badge && (
          <span
            className={`absolute top-4 left-4 z-[2] rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] font-medium shadow-soft ${badgeColor[p.badge]}`}
          >
            {p.badge}
          </span>
        )}

        <div className="absolute top-4 right-4 z-[3] flex flex-col gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(p.id);
            }}
            aria-label="Wishlist"
            className={`h-9 w-9 grid place-items-center rounded-full glass transition ${
              wished ? "text-gold" : "hover:text-gold"
            }`}
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
          </motion.button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickView(p);
            }}
            aria-label="Quick view"
            className="h-9 w-9 grid place-items-center rounded-full glass hover:text-gold transition opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 duration-500"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(p.id);
            setCartOpen(true);
          }}
          className="absolute z-[3] inset-x-4 bottom-4 inline-flex items-center justify-center gap-2 rounded-full bg-foreground/95 text-background py-3 text-[10px] uppercase tracking-[0.28em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 backdrop-blur"
        >
          <ShoppingBag className="h-3.5 w-3.5" /> Add to Bag
        </button>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{p.category}</p>
        <h3 className="mt-1.5 font-serif text-xl sm:text-2xl leading-tight">{p.name}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base text-gold font-medium">₹ {p.price.toLocaleString()}</span>
          {p.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ₹ {p.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
