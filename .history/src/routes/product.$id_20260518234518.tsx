import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Heart, ShoppingBag } from "lucide-react";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductById, products as ALL, type Product } from "@/data/products";
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
  const data = Route.useLoaderData();
  const product = data.product as Product;
  const related = data.related as Product[];
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
            className="relative aspect-square rounded-lg overflow-hidden bg-foreground/5"
          >
            <img
              src={activeImg}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(img)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  activeImg === img ? "border-gold" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt="Thumbnail"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="font-display text-2xl sm:text-3xl tracking-tight">
            {product.name}
          </h1>
          <p className="mt-2 text-sm text-foreground/60">{product.material}</p>
          <p className="mt-4 text-lg font-semibold text-gold">{product.price}</p>
          <p className="mt-6 text-sm text-foreground/75">{product.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => {
                addToCart(product);
                setCartOpen(true);
              }}
              className="px-6 py-3 bg-gold text-background rounded-lg hover:bg-gold/90 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-lg border ${wished ? "bg-gold text-background" : "border-foreground/10"}`}
            >
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="mx-auto max-w-7xl px-3 sm:px-6 py-10 sm:py-16">
        <h2 className="font-display text-xl sm:text-2xl tracking-tight mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {related.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
