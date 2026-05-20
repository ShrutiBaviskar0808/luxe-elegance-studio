import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";

import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { useShop } from "@/context/ShopContext";
import { getProductById, products as ALL, type Product } from "@/data/products";

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
  const { product, related } = Route.useLoaderData()!;
  const { addToCart, setCartOpen, toggleWishlist, isWished } = useShop();
  const [activeImg, setActiveImg] = useState(product.image);
  const wished = isWished(product.id);

  useEffect(() => {
    setActiveImg(product.image);
  }, [product.id, product.image]);

  const gallery = product.gallery?.length
    ? Array.from(new Set([product.image, ...product.gallery, product.image])).slice(0, 4)
    : [product.image, product.image, product.image, product.image];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Navbar />

      <div className="mx-auto max-w-7xl px-3 pt-6 sm:px-6 sm:pt-10">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-foreground">{product.name}</span>
        </nav>
      </div>

      <section
        key={product.id}
        className="mx-auto grid max-w-7xl gap-8 px-3 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-14"
      >
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-square overflow-hidden rounded-lg bg-foreground/5"
          >
            <img
              src={activeImg}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(img)}
                className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  activeImg === img ? "border-gold" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
            {product.collection ?? product.category}
          </p>
          <h1 className="font-display text-2xl tracking-tight sm:text-3xl">{product.name}</h1>
          <p className="mt-2 text-sm text-foreground/60">
            {product.subcategory ?? product.material ?? "Hand-finished fine jewellery"}
          </p>
          <p className="mt-4 text-lg font-semibold text-gold">₹ {product.price.toLocaleString()}</p>
          <p className="mt-6 text-sm text-foreground/75">
            {product.description ?? "A timeless piece designed to elevate everyday wear."}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-foreground/10 bg-background p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Material</p>
              <p className="mt-1 text-sm text-foreground">{product.material ?? "Mixed metal finish"}</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-background p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Shipping</p>
              <p className="mt-1 text-sm text-foreground">Ships in 3-5 business days</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-background p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Care</p>
              <p className="mt-1 text-sm text-foreground">Keep dry and store in the box provided</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-background p-4">
              <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">Packaging</p>
              <p className="mt-1 text-sm text-foreground">Gift-ready premium packaging</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => {
                addToCart(product.id);
                setCartOpen(true);
              }}
              className="rounded-lg bg-gold px-6 py-3 text-background transition hover:bg-gold/90"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`rounded-lg border p-3 ${
                wished ? "bg-gold text-background" : "border-foreground/10"
              }`}
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 py-10 sm:px-6 sm:py-16">
        <h2 className="mb-6 font-display text-xl tracking-tight sm:text-2xl">Related Products</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {(related as Product[]).map((p: Product) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
