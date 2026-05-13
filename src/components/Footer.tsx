import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-onyx text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-3xl tracking-[0.25em]">
            MAISON<span className="text-gold">·</span>OR
          </p>
          <p className="mt-5 max-w-sm text-ivory/60 leading-relaxed">
            Hand-finished fine jewelry, made to be lived in. Designed in our
            Jaipur atelier — delivered to your door, with love.
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
          items={["New Arrival", "Earrings", "Rings", "Necklaces", "Bracelets"]}
        />
        <FooterCol
          title="Maison"
          items={["About Us", "Atelier", "Sustainability", "Press", "Careers"]}
        />
        <FooterCol
          title="Care"
          items={["Reach Out", "Shipping", "Returns", "Lifetime care", "FAQ"]}
        />
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-ivory/50">
          <p>© {new Date().getFullYear()} Maison Or. All rights reserved.</p>
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
