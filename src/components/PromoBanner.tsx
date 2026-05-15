import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="relative py-20 sm:py-28 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[2.5rem] shadow-luxe min-h-[440px] grid lg:grid-cols-2"
        >
          <div className="relative bg-gradient-onyx p-10 sm:p-14 lg:p-16 flex flex-col justify-center text-ivory">
            <div className="pointer-events-none absolute -top-20 -left-20 h-[340px] w-[340px] rounded-full bg-gold/30 blur-[120px]" />
            <p className="text-xs uppercase tracking-[0.35em] text-gold relative">
              The Festive Edit
            </p>
            <h3 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-balance relative">
              Up to <em className="not-italic text-gradient-gold">20% off</em>
            </h3>
            <div className="mt-8 relative">
              <a
                href="#new-arrival"
                className="shine inline-flex items-center gap-3 rounded-full bg-gradient-gold text-onyx px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-medium shadow-glow"
              >
                Shop the edit <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative min-h-[280px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1400&q=85"
              alt="Festive jewelry edit"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-onyx/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
