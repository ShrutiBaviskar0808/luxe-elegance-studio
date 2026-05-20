import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { categorySlugs, isCategorySlug, type CategorySlug, type CollectionSection } from "@/data/categoryCollections";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/$category")({
  loader: ({ params }) => {
    if (!isCategorySlug(params.category)) throw notFound();
    const slug = params.category as CategorySlug;
    const data = categorySlugs[slug];
    const products = data.sections.flatMap((section) => section.products);
    return {
      slug: params.category,
      title: data.title,
      description: data.description,
      heroImage: data.heroImage,
      sections: data.sections,
      products,
    };
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
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Collection not found</p>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl">Explore a real collection instead</h1>
          <p className="mt-4 text-sm text-foreground/65">
            The requested page slug does not match one of the luxury collection routes, so pick a
            curated edit below.
          </p>
          <Link to="/" className="mt-6 inline-block text-gold underline">
            Back to home
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {(Object.entries(categorySlugs) as Array<[CategorySlug, (typeof categorySlugs)[CategorySlug]]>).map(
            ([slug, data]) => (
              <Link
                key={slug}
                to="/$category"
                params={{ category: slug }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-cream shadow-soft"
              >
                <img
                  src={data.heroImage}
                  alt={data.title}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-onyx/80 via-onyx/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-background">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-background/70">Collection</p>
                  <h2 className="mt-2 font-display text-2xl">{data.title}</h2>
                  <p className="mt-2 text-sm text-background/80">{data.description}</p>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
      <Footer />
    </div>
  ),
});

function CategoryPage() {
  const data = Route.useLoaderData();
  const { title, description, heroImage, sections } = data;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AnnouncementBar />
      <Navbar />

      <section className="relative overflow-hidden border-b border-foreground/10 bg-cream">
        <div className="absolute inset-0 opacity-30">
          <img src={heroImage} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-cream/30 via-cream/70 to-cream" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-20">
          <nav className="mb-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            <Link to="/" className="transition hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{title}</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-3xl tracking-tight sm:text-5xl"
          >
            <em className="not-italic text-gradient-gold">{title}</em>
          </motion.h1>
          <p className="mt-3 text-xs tracking-wide text-foreground/60 sm:text-sm">
            {description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-3 py-10 sm:px-6 sm:py-16">
        <div className="space-y-10 sm:space-y-14">
          {(sections as CollectionSection[]).map((section: CollectionSection, sectionIndex: number) => (
            <div key={section.title}>
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Subcategory</p>
                  <h2 className="mt-1 font-display text-2xl tracking-tight sm:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-foreground/65">{section.description}</p>
                </div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/50">
                  {section.products.length} items
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {section.products.map((product: Product, index: number) => (
                  <ProductCard key={product.id} p={product} index={sectionIndex * 6 + index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
