import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
  eyebrow?: string;
  title?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  id?: string;
  bg?: "ivory" | "cream" | "background";
};

const bgMap = {
  ivory: "bg-gradient-ivory",
  cream: "bg-cream",
  background: "bg-background",
};

export default function ProductCarousel({
  products,
  eyebrow,
  title,
  ctaLabel,
  ctaHref,
  id,
  bg = "background",
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    loop: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!products.length) return null;

  return (
    <section
      id={id}
      className={`relative py-12 sm:py-16 overflow-hidden scroll-mt-24 ${bgMap[bg]}`}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-gold"
              >
                {eyebrow}
              </motion.p>
            )}
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 }}
                className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl leading-[0.95]"
              >
                {title}
              </motion.h2>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="h-11 w-11 grid place-items-center rounded-full border border-foreground/15 bg-background hover:border-gold hover:text-gold transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="h-11 w-11 grid place-items-center rounded-full border border-foreground/15 bg-background hover:border-gold hover:text-gold transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden -mx-2">
            <div className="flex touch-pan-y">
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className="shrink-0 grow-0 px-2 basis-[72%] sm:basis-[45%] md:basis-[33%] lg:basis-[25%] xl:basis-[22%]"
                >
                  <ProductCard p={p} index={i} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile arrows */}
          <div className="sm:hidden mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="h-10 w-10 grid place-items-center rounded-full border border-foreground/15 bg-background disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="h-10 w-10 grid place-items-center rounded-full border border-foreground/15 bg-background disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {ctaLabel && ctaHref && (
          <div className="mt-10 text-center">
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] hover:text-gold transition"
            >
              {ctaLabel} →
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
