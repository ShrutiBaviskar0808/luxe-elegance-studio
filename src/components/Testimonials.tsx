import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    name: "Anaya Kapoor",
    role: "Mumbai · Bride",
    text: "My PIPA earrings were the talking point of every event. The detailing is unreal — it feels like wearing art.",
  },
  {
    name: "Sara Mehta",
    role: "London · Stylist",
    text: "Effortlessly elegant. PIPA pieces layer beautifully and feel just as right with denim as they do with silk.",
  },
  {
    name: "Riya Sharma",
    role: "Delhi · Collector",
    text: "The craftsmanship is genuinely heirloom-grade. I'm already planning my third commission.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-14 sm:py-12 bg-background overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-champagne/40 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">Words from our muses</p>
          <h2 className="mt-3 font-display text-5xl sm:text-6xl leading-[0.95] text-balance">
            Adored by women <em className="not-italic text-gradient-gold">who know</em>.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative rounded-[2rem] glass p-8 shadow-soft hover:shadow-luxe transition"
            >
              <Quote className="h-8 w-8 text-gold opacity-60" />
              <blockquote className="mt-5 font-serif text-xl leading-relaxed text-foreground/90">
                "{r.text}"
              </blockquote>
              <div className="mt-6 flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <figcaption className="mt-4">
                <p className="font-medium">{r.name}</p>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-0.5">
                  {r.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
