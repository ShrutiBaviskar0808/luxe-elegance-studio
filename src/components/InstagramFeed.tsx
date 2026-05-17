import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const shots = [
  "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=800&q=80",
];

export default function InstagramFeed() {
  return (
    <section className="relative py-12 sm:py-16 bg-gradient-ivory overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">@pipa.jewellery</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.95] text-balance">
            As seen on <em className="not-italic text-gradient-gold">Instagram</em>.
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] hover:text-gold transition"
          >
            <Instagram className="h-4 w-4" /> Follow us
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {shots.map((src, i) => (
            <motion.a
              key={src}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-2xl shadow-soft"
            >
              <img
                src={src}
                alt="Instagram"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-onyx/0 group-hover:bg-onyx/45 transition flex items-center justify-center">
                <Instagram className="h-6 w-6 text-ivory opacity-0 group-hover:opacity-100 transition" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
