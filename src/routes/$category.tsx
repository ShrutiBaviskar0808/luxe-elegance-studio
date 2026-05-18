import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categorySlugs, isCategorySlug } from "@/data/products";

export const Route = createFileRoute("/$category")({
  loader: ({ params }) => {
    if (!isCategorySlug(params.category)) throw notFound();
    const data = categorySlugs[params.category];
    return { slug: params.category, title: data.title, products: data.products };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — PIPA Jewellery` },
          {
            name: "description",
            content: `Shop ${loaderData.title.toLowerCase()} at PIPA Jewellery — hand-finished luxury fine jewellery.`,
          },
        ]
      : [{ title: "Collection — PIPA Jewellery" }],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl">Collection not found</h1>
        <Link to="/" className="mt-6 inline-block text-gold underline">
          Back to home
        </Link>
      </div>
      <Footer />
    </div>
  ),
});

function CategoryPage() {
  const { title, products } = Route.useLoaderData();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-foreground/10 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20 text-center">
          <nav className="mb-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            <Link to="/" className="hover:text-foreground transition">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{title}</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl sm:text-5xl tracking-tight"
          >
            <em className="not-italic text-gradient-gold">{title}</em>
          </motion.h1>
          <p className="mt-3 text-xs sm:text-sm text-foreground/60 tracking-wide">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-3 sm:px-6 py-10 sm:py-16">
        {products.length === 0 ? (
          <div className="py-20 text-center text-foreground/60">
            <p>New arrivals coming soon to this collection.</p>
            <Link
              to="/"
              className="mt-6 inline-block text-[11px] uppercase tracking-[0.28em] text-gold hover:underline"
            >
              ← Continue shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
