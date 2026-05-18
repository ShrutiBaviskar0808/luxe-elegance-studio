import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { categorySlugs, type CategorySlug } from "@/data/categoryCollections";

const collections: Array<{
  slug: CategorySlug;
  tag: string;
  span: string;
}> = [
  {
    slug: "tarnish-jewellery",
    tag: "Hand-finished luxury",
    span: "lg:col-span-7 lg:row-span-2",
  },
  {
    slug: "oxidish-jewellery",
    tag: "Heritage silver-tone",
    span: "lg:col-span-5",
  },
  {
    slug: "cuties-gift-hampers",
    tag: "Gift-ready sets",
    span: "lg:col-span-5",
  },
  {
    slug: "additions",
    tag: "Accessories & layering",
    span: "lg:col-span-12",
  },
];

export default function Collections() {
  return (
    <section
      id="collections"
      className="relative overflow-hidden bg-cream py-14 scroll-mt-24 sm:py-12"
    >
      <div className="pointer-events-none absolute -top-32 left-1/3 h-105 w-105 rounded-full bg-champagne/40 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Curated Edits</p>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] text-balance sm:text-5xl lg:text-6xl">
            Shop by <em className="not-italic text-gradient-gold">Collection</em>
          </h2>
          <p className="mt-4 text-sm text-foreground/60 sm:text-base">
            Open a collection page to browse full subcategories, detailed product cards, and the
            full luxury demo lineup.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 auto-rows-[260px] lg:grid-cols-12 lg:gap-6 lg:auto-rows-[280px]">
          {collections.map((c, i) => {
            const data = categorySlugs[c.slug];
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-[2rem] shadow-soft transition-all duration-500 hover:shadow-luxe ${c.span}`}
              >
                <Link
                  to="/$category"
                  params={{ category: c.slug }}
                  className="group block h-full w-full text-left"
                >
                  <img
                    src={data.heroImage}
                    alt={data.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-onyx/85 via-onyx/25 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-between p-7 text-background sm:p-9">
                    <div className="flex items-start justify-between gap-4">
                      <span className="glass-dark rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-ivory">
                        {c.tag}
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-full glass-dark text-ivory transition-transform group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/70">
                        Collection
                      </p>
                      <h3 className="mt-1 font-display text-4xl text-ivory sm:text-5xl lg:text-6xl">
                        {data.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm text-ivory/80 sm:text-base">
                        {data.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
