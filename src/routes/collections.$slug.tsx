import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import {
  isSubcategorySlug,
  subcategorySlugs,
} from "@/data/categoryCollections";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    if (!isSubcategorySlug(params.slug)) throw notFound();
    const data = subcategorySlugs[params.slug];
    return { ...data };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — PIPA Jewellery` },
          {
            name: "description",
            content: `Shop ${loaderData.title.toLowerCase()} at PIPA Jewellery — ${loaderData.description}`,
          },
        ]
      : [{ title: "Collection — PIPA Jewellery" }],
  }),
  component: SubcategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Collection not found</p>
        <h1 className="mt-4 font-display text-3xl sm:text-5xl">Browse another category</h1>
        <p className="mt-4 text-sm text-foreground/65">
          The collection you tried to open does not exist.
        </p>
        <Link to="/" className="mt-6 inline-block text-gold underline">
          Back to home
        </Link>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {Object.values(subcategorySlugs).map((sc) => (
            <Link
              key={sc.slug}
              to="/collections/$slug"
              params={{ slug: sc.slug }}
              className="rounded-full border border-foreground/15 px-4 py-2 text-xs uppercase tracking-[0.22em] text-foreground/70 hover:bg-foreground hover:text-background transition"
            >
              {sc.title}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center bg-background px-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <p className="mt-3 text-sm text-foreground/65">{error.message}</p>
        <Link to="/" className="mt-6 inline-block text-gold underline">
          Back to home
        </Link>
      </div>
    </div>
  ),
});

function SubcategoryPage() {
  const { slug, title, description, heroImage, parents, products } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-foreground/10 bg-cream">
        <div className="absolute inset-0 opacity-30">
          <img src={heroImage} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-cream/40 via-cream/75 to-cream" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-20">
          <nav className="mb-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            <Link to="/" className="transition hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span>Collections</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{title}</span>
          </nav>
          <motion.h1
            key={slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl tracking-tight sm:text-5xl"
          >
            <em className="not-italic text-gradient-gold">{title}</em>
          </motion.h1>
          <p className="mt-3 text-xs tracking-wide text-foreground/65 sm:text-sm">{description}</p>
          {parents.length > 0 && (
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-foreground/50">
              From {parents.join(" · ")}
            </p>
          )}
          <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-foreground/55">
            {products.length} items
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-7xl px-3 py-10 sm:px-6 sm:py-14">
        {products.length === 0 ? (
          <p className="text-center text-sm text-foreground/60 py-20">
            No products available in this collection yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {(products as Product[]).map((product: Product, index: number) => (
              <ProductCard key={product.id} p={product} index={index} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
