import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-onyx text-ivory">
      {/* Newsletter */}
      <div className="border-b border-ivory/10">
        <div className="mx-auto max-w-7xl px-6 py-14 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gold">The PIPA Letter</p>
            <h3 className="mt-3 font-display text-3xl sm:text-4xl leading-tight">
              Receive new edits, atelier stories, and private access — first.
            </h3>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="lg:col-span-6 flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 rounded-full bg-ivory/5 border border-ivory/15 px-6 py-4 text-ivory placeholder:text-ivory/40 outline-none focus:border-gold transition"
            />
            <button className="shine inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold text-onyx px-7 py-4 text-xs uppercase tracking-[0.25em] font-medium shadow-glow">
              Subscribe <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo tone="light" />
          <p className="mt-5 max-w-sm text-ivory/60 leading-relaxed">
            Hand-finished fine jewellery, made to be lived in. Designed in our atelier — delivered
            to your door, with love.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 grid place-items-center rounded-full border border-ivory/15 hover:border-gold hover:text-gold transition"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Shop"
          items={["New Arrival", "Earrings", "Rings", "Bracelets", "Necklaces"]}
        />
        <FooterCol
          title="PIPA"
          items={["About Us", "Atelier", "Sustainability", "Press", "Careers"]}
        />
        <FooterCol
          title="Care"
          items={["Reach Out", "Shipping", "Returns", "Lifetime care", "FAQ"]}
        />
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-ivory/50">
          <p>© 2026 PIPA JEWELLERY — All Rights Reserved</p>
          <p>Crafted with intention · Jaipur · Paris · New York</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="lg:col-span-2">
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{title}</p>
      <ul className="mt-5 space-y-3">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="text-ivory/70 hover:text-ivory transition story-link">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
