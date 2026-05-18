import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Heart, ShoppingBag } from "lucide-react";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductById, products as ALL } from "@/data/products";
import { useShop } from "@/context/ShopContext";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProductById(params.id);
    if (!product) throw notFound();
    const related = ALL.filter((p) => p.category === product.category && p.id !== product.id).slice(
      0,
      4,
    );
    return { product, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — PIPA Jewellery` },
          { name: "description", content: `${loaderData.product.name} from PIPA Jewellery.` },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Product — PIPA Jewellery" }],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl">Product not found</h1>
        <Link to="/" className="mt-6 inline-block text-gold underline">
          Back to home
        </Link>
      </div>
      <Footer />
    </div>
  ),
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const { addToCart, setCartOpen, toggleWishlist, isWished } = useShop();
  const [activeImg, setActiveImg] = useState(product.image);
  const wished = isWished(product.id);

  // Build a small gallery (repeat main image as fallback)
  const gallery = [product.image, product.image, product.image, product.image];

  return (
    <main className="bg-background text-foreground min-h-screen">
      <AnnouncementBar />
      <Navbar />

      <div className="mx-auto max-w-7xl px-3 sm:px-6 pt-6 sm:pt-10">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-3 sm:px-6 py-8 sm:py-12 grid lg:grid-cols-2 gap-8 lg:gap-14">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="aspect-square rounded-[1.75rem] overflow-hidden bg-cream shadow-soft"
          >
            <img src={activeImg} alt={product.name} className="h-full w-full object-cover" />
          </motion.div>
          <div className="mt-3 sm:mt-4 grid grid-cols-4 gap-2 sm:gap-3">
            {gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(g)}
                className={`aspect-square rounded-xl overflow-hidden border transition ${
                  activeImg === g ? "border-gold" : "border-foreground/10 hover:border-foreground/30"
                }`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:pt-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {product.category}
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl leading-tight">{product.name}</h1>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl text-gold font-medium">
              ₹ {product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹ {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="mt-6 text-sm text-foreground/70 leading-relaxed">
            A signature PIPA piece, hand-finished in our atelier. Designed to layer beautifully and
            wear effortlessly — from morning rituals to evening celebrations.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-xs text-foreground/70">
            <li className="rounded-lg border border-foreground/10 px-3 py-2">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                Material
              </span>
              18k Gold Vermeil
            </li>
            <li className="rounded-lg border border-foreground/10 px-3 py-2">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                Finish
              </span>
              Anti-tarnish
            </li>
            <li className="rounded-lg border border-foreground/10 px-3 py-2">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                Care
              </span>
              Keep dry & clean
            </li>
            <li className="rounded-lg border border-foreground/10 px-3 py-2">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-foreground/45">
                Shipping
              </span>
              Free over ₹4999
            </li>
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                addToCart(product.id);
                setCartOpen(true);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-3.5 text-[11px] uppercase tracking-[0.28em] hover:opacity-90 transition"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Bag
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-6 py-3.5 text-[11px] uppercase tracking-[0.28em] transition ${
                wished ? "text-gold border-gold" : "hover:border-foreground/40"
              }`}
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-current" : ""}`} />
              {wished ? "Wishlisted" : "Wishlist"}
            </button>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-3 sm:px-6 py-12 sm:py-16">
          <h2 className="font-display text-2xl sm:text-3xl mb-6 sm:mb-8">
            You may also <em className="not-italic text-gradient-gold">love</em>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
