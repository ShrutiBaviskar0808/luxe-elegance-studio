import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/data/products";

const badgeColor: Record<string, string> = {
  New: "bg-gradient-gold text-onyx",
  Bestseller: "bg-onyx text-ivory",
  Limited: "bg-bronze text-ivory",
  Trending: "bg-champagne text-onyx",
};

export default function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const wa = `https://wa.me/919999999999?text=${encodeURIComponent(
    `Hi PIPA Jewellery, I'd like to order: ${p.name} (₹${p.price.toLocaleString()})`,
  )}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: "easeOut" }}
      className="group relative rounded-[1.75rem] overflow-hidden bg-card shadow-soft hover:shadow-luxe transition-all duration-500 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-cream">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/45 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition" />

        {p.badge && (
          <span
            className={`absolute top-4 left-4 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] font-medium shadow-soft ${badgeColor[p.badge]}`}
          >
            {p.badge}
          </span>
        )}

        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
          <button
            aria-label="Wishlist"
            className="h-9 w-9 grid place-items-center rounded-full glass hover:text-gold transition"
          >
            <Heart className="h-4 w-4" />
          </button>
          <button
            aria-label="Quick view"
            className="h-9 w-9 grid place-items-center rounded-full glass hover:text-gold transition"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        <div className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-x-4 bottom-4 text-center rounded-full bg-foreground/95 text-background py-3 text-[10px] uppercase tracking-[0.28em] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 backdrop-blur"
        >
          Order on WhatsApp
        </a>
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
