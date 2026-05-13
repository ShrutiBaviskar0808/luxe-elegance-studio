import { Truck, Shield, Sparkles } from "lucide-react";

const items = [
  { icon: Truck, text: "Complimentary shipping worldwide" },
  { icon: Sparkles, text: "Hand-finished in our atelier" },
  { icon: Shield, text: "Lifetime care · 100% authenticity" },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-onyx text-ivory text-[11px] uppercase tracking-[0.28em]">
      <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center justify-between gap-4 overflow-hidden">
        <div className="hidden sm:flex items-center gap-8 text-ivory/70">
          {items.slice(0, 2).map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2">
              <Icon className="h-3 w-3 text-gold" /> {text}
            </span>
          ))}
        </div>
        <p className="mx-auto sm:mx-0 text-ivory/90">
          ✦ Festive Edit · Up to 20% off select pieces ✦
        </p>
        <span className="hidden lg:inline-flex items-center gap-2 text-ivory/70">
          <Shield className="h-3 w-3 text-gold" /> Lifetime care
        </span>
      </div>
    </div>
  );
}
