export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Aurelia Drop Earrings",
    category: "Earrings",
    price: 8400,
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p2",
    name: "Celeste Diamond Ring",
    category: "Rings",
    price: 24900,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p3",
    name: "Soleil Pendant Necklace",
    category: "Necklaces",
    price: 14500,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p4",
    name: "Vienne Tennis Bracelet",
    category: "Bracelets",
    price: 18200,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p5",
    name: "Lumière Hoop Earrings",
    category: "Earrings",
    price: 6700,
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p6",
    name: "Étoile Layered Chain",
    category: "Necklaces",
    price: 11900,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
  },
];
