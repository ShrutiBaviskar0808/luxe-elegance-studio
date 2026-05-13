export type Product = {
  id: string;
  name: string;
  category: "Earrings" | "Rings" | "Necklaces" | "Bracelets";
  price: number;
  oldPrice?: number;
  image: string;
  badge?: "New" | "Bestseller" | "Limited" | "Trending";
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Aurelia Drop Earrings",
    category: "Earrings",
    price: 8400,
    oldPrice: 9800,
    image:
      "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1200&q=80",
    badge: "New",
  },
  {
    id: "p2",
    name: "Celeste Diamond Ring",
    category: "Rings",
    price: 24900,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
    badge: "Bestseller",
  },
  {
    id: "p3",
    name: "Soleil Pendant Necklace",
    category: "Necklaces",
    price: 14500,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    badge: "Trending",
  },
  {
    id: "p4",
    name: "Vienne Tennis Bracelet",
    category: "Bracelets",
    price: 18200,
    oldPrice: 21000,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
    badge: "New",
  },
  {
    id: "p5",
    name: "Lumière Hoop Earrings",
    category: "Earrings",
    price: 6700,
    image:
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1200&q=80",
    badge: "Bestseller",
  },
  {
    id: "p6",
    name: "Étoile Layered Chain",
    category: "Necklaces",
    price: 11900,
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
    badge: "Trending",
  },
  {
    id: "p7",
    name: "Mira Solitaire Studs",
    category: "Earrings",
    price: 5400,
    image: "/images/mira-solitaire-studs.svg",
    badge: "Bestseller",
  },
  {
    id: "p8",
    name: "Ophelia Stacking Ring",
    category: "Rings",
    price: 7900,
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=80",
    badge: "Trending",
  },
  {
    id: "p9",
    name: "Belle Pearl Bracelet",
    category: "Bracelets",
    price: 9600,
    image:
      "https://images.unsplash.com/photo-1551122089-4e3e72477432?auto=format&fit=crop&w=1200&q=80",
    badge: "New",
  },
  {
    id: "p10",
    name: "Rosé Halo Pendant",
    category: "Necklaces",
    price: 13400,
    oldPrice: 15800,
    image:
      "https://images.unsplash.com/photo-1583937443566-6fe1a1c6e400?auto=format&fit=crop&w=1200&q=80",
    badge: "Limited",
  },
  {
    id: "p11",
    name: "Aria Chandelier Earrings",
    category: "Earrings",
    price: 12200,
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=80",
    badge: "Limited",
  },
  {
    id: "p12",
    name: "Vera Eternity Band",
    category: "Rings",
    price: 16800,
    image:
      "https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=1200&q=80",
    badge: "Bestseller",
  },
];

export const bestSellers = products.filter((p) => p.badge === "Bestseller");
export const newArrivals = products.filter((p) => p.badge === "New" || p.badge === "Limited");
export const trending = products.filter((p) => p.badge === "Trending" || p.badge === "Limited");
