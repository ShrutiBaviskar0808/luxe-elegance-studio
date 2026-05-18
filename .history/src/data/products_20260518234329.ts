export type Product = {
  id: string;
  name: string;
  category: "Earrings" | "Rings" | "Necklaces" | "Bracelets";
  price: number;
  oldPrice?: number;
  image: string;
  badge?: "New" | "Bestseller" | "Limited" | "Trending";
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

// EARRINGS
const earrings: Product[] = [
  { id: "e1", name: "Aurelia Drop Earrings", category: "Earrings", price: 8400, oldPrice: 9800, image: img("photo-1535632787350-4e68ef0ac584"), badge: "New" },
  { id: "e2", name: "Lumière Hoop Earrings", category: "Earrings", price: 6700, image: img("photo-1630019852942-f89202989a59"), badge: "Bestseller" },
  { id: "e3", name: "Mira Solitaire Studs", category: "Earrings", price: 5400, image: img("photo-1620656798932-902a85a48d50"), badge: "Bestseller" },
  { id: "e4", name: "Aria Chandelier Earrings", category: "Earrings", price: 12200, image: img("photo-1588444837495-c6cfeb53f32d"), badge: "Limited" },
  { id: "e5", name: "Selene Pearl Drops", category: "Earrings", price: 7200, image: img("photo-1635767798638-3e25273a8236"), badge: "New" },
  { id: "e6", name: "Noor Crystal Studs", category: "Earrings", price: 4800, image: img("photo-1593795899768-947c4929449d"), badge: "Trending" },
  { id: "e7", name: "Élise Gold Hoops", category: "Earrings", price: 8900, image: img("photo-1561172317-c64a767e2d6c") },
  { id: "e8", name: "Camille Tassel Earrings", category: "Earrings", price: 9600, image: img("photo-1633934542430-0905ec3f9d70") },
];

// RINGS
const rings: Product[] = [
  { id: "r1", name: "Celeste Diamond Ring", category: "Rings", price: 24900, image: img("photo-1605100804763-247f67b3557e"), badge: "Bestseller" },
  { id: "r2", name: "Ophelia Stacking Ring", category: "Rings", price: 7900, image: img("photo-1603561591411-07134e71a2a9"), badge: "Trending" },
  { id: "r3", name: "Vera Eternity Band", category: "Rings", price: 16800, image: img("photo-1602752250015-52934bc45613"), badge: "Bestseller" },
  { id: "r4", name: "Isla Solitaire Ring", category: "Rings", price: 18900, image: img("photo-1598560917505-59a3ad60e16c"), badge: "New" },
  { id: "r5", name: "Margot Halo Ring", category: "Rings", price: 21500, oldPrice: 24800, image: img("photo-1611652022419-a9419f74343d"), badge: "Limited" },
  { id: "r6", name: "Juno Twist Band", category: "Rings", price: 9800, image: img("photo-1598560917807-1bae44bd2be8") },
  { id: "r7", name: "Liana Vintage Ring", category: "Rings", price: 13400, image: img("photo-1596944946297-cfc6a4f4a536") },
  { id: "r8", name: "Sienna Open Band", category: "Rings", price: 8200, image: img("photo-1602173574767-37ac01994b2a"), badge: "New" },
];

// NECKLACES (chains, pendants, necklace sets)
const necklaces: Product[] = [
  { id: "n1", name: "Soleil Pendant Necklace", category: "Necklaces", price: 14500, image: img("photo-1599643478518-a784e5dc4c8f"), badge: "Trending" },
  { id: "n2", name: "Étoile Layered Chain", category: "Necklaces", price: 11900, image: img("photo-1611591437281-460bfbe1220a"), badge: "Trending" },
  { id: "n3", name: "Rosé Halo Pendant", category: "Necklaces", price: 13400, oldPrice: 15800, image: img("photo-1573408301185-9146fe634ad0"), badge: "Limited" },
  { id: "n4", name: "Linnea Pearl Necklace", category: "Necklaces", price: 16800, image: img("photo-1599643478518-a784e5dc4c8f"), badge: "Bestseller" },
  { id: "n5", name: "Aviva Gold Chain", category: "Necklaces", price: 10800, image: img("photo-1611652022419-a9419f74343d"), badge: "New" },
  { id: "n6", name: "Mira Choker Set", category: "Necklaces", price: 19500, image: img("photo-1535632066274-1c2253d324d7") },
  { id: "n7", name: "Saffron Layered Set", category: "Necklaces", price: 22400, image: img("photo-1611107683227-e9060eccd846"), badge: "Limited" },
  { id: "n8", name: "Cleo Coin Pendant", category: "Necklaces", price: 9400, image: img("photo-1602173574767-37ac01994b2a") },
];

// BRACELETS (bracelets, bangles, kada, anklets, hand chains)
const bracelets: Product[] = [
  { id: "b1", name: "Vienne Tennis Bracelet", category: "Bracelets", price: 18200, oldPrice: 21000, image: img("photo-1611591437281-460bfbe1220a"), badge: "New" },
  { id: "b2", name: "Belle Pearl Bracelet", category: "Bracelets", price: 9600, image: img("photo-1551122089-4e3e72477432"), badge: "New" },
  { id: "b3", name: "Cara Gold Bangle", category: "Bracelets", price: 12400, image: img("photo-1602173574767-37ac01994b2a"), badge: "Bestseller" },
  { id: "b4", name: "Layla Charm Bracelet", category: "Bracelets", price: 8900, image: img("photo-1535632066274-1c2253d324d7"), badge: "Trending" },
  { id: "b5", name: "Anya Anklet", category: "Bracelets", price: 5800, image: img("photo-1599643478518-a784e5dc4c8f") },
  { id: "b6", name: "Zara Hand Chain", category: "Bracelets", price: 7400, image: img("photo-1611591437281-460bfbe1220a"), badge: "New" },
  { id: "b7", name: "Reya Kada Cuff", category: "Bracelets", price: 14800, image: img("photo-1602173574767-37ac01994b2a"), badge: "Limited" },
  { id: "b8", name: "Mira Beaded Anklet", category: "Bracelets", price: 4900, image: img("photo-1551122089-4e3e72477432") },
];

export const products: Product[] = [...earrings, ...rings, ...necklaces, ...bracelets];

export const bestSellers = products.filter((p) => p.badge === "Bestseller");
export const newArrivals = products.filter((p) => p.badge === "New" || p.badge === "Limited");
export const trending = products.filter((p) => p.badge === "Trending" || p.badge === "Limited");

export const byCategory = {
  Earrings: earrings,
  Rings: rings,
  Necklaces: necklaces,
  Bracelets: bracelets,
};

// Slug-based collection mapping for dedicated category pages
const has = (p: Product, ...keywords: string[]) =>
  keywords.some((k) => p.name.toLowerCase().includes(k.toLowerCase()));

export const categorySlugs = {
  earrings: { title: "Earrings", products: earrings },
  rings: { title: "Rings", products: rings },
  chain: { title: "Chains & Necklaces", products: necklaces },
  bracelet: {
    title: "Bracelets",
    products: bracelets.filter((p) => has(p, "Bracelet")),
  },
  bangles: {
    title: "Bangles & Kada",
    products: bracelets.filter((p) => has(p, "Bangle", "Kada", "Cuff")),
  },
  anklet: {
    title: "Anklets",
    products: bracelets.filter((p) => has(p, "Anklet")),
  },
  "hand-chain": {
    title: "Hand Chains",
    products: bracelets.filter((p) => has(p, "Hand Chain")),
  },
  payal: {
    title: "Payal",
    products: bracelets.filter((p) => has(p, "Anklet", "Payal")),
  },
  belt: { title: "Belts", products: [] as Product[] },
  "necklace-set": { title: "Necklace Sets", products: necklaces },
} as const;

export type CategorySlug = keyof typeof categorySlugs;

export const isCategorySlug = (s: string): s is CategorySlug =>
  Object.prototype.hasOwnProperty.call(categorySlugs, s);

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const demoProducts = {
  "Tarnish Jewellery": {
    description: "Hand-finished · Made to Last",
    subcategories: {
      Earrings: [
        {
          name: "Golden Hoop Earrings",
          image: "/images/tarnish/earrings1.jpg",
          description: "Elegant gold hoop earrings with a polished finish.",
          price: "$120",
          material: "Gold-plated brass",
        },
        {
          name: "Pearl Drop Earrings",
          image: "/images/tarnish/earrings2.jpg",
          description: "Classic pearl drop earrings for timeless elegance.",
          price: "$150",
          material: "Gold-plated brass, pearls",
        },
        // Add more products here
      ],
      Bangles: [
        {
          name: "Gold Cuff Bangle",
          image: "/images/tarnish/bangles1.jpg",
          description: "Minimalist gold cuff bangle with a sleek design.",
          price: "$200",
          material: "Gold-plated brass",
        },
        // Add more products here
      ],
      // Add other subcategories here
    },
  },
  "Oxidish Jewellery": {
    description: "Heritage silver-tone craft",
    subcategories: {
      Earrings: [
        {
          name: "Oxidised Jhumkas",
          image: "/images/oxidish/earrings1.jpg",
          description: "Traditional oxidised silver jhumkas with intricate detailing.",
          price: "$80",
          material: "Oxidised silver",
        },
        // Add more products here
      ],
      // Add other subcategories here
    },
  },
  "Cuties / Gift Hampers": {
    description: "Curated boxes to gift",
    subcategories: {
      Hampers: [
        {
          name: "Festive Gift Box",
          image: "/images/cuties/hampers1.jpg",
          description: "A curated box of jewellery perfect for festive gifting.",
          price: "$250",
          material: "Gold-plated brass, pearls",
        },
        // Add more products here
      ],
    },
  },
  Additions: {
    description: "Extra accessory products",
    subcategories: {
      Charms: [
        {
          name: "Heart Charm",
          image: "/images/additions/charms1.jpg",
          description: "A delicate heart charm for your bracelets or necklaces.",
          price: "$30",
          material: "Gold-plated brass",
        },
        // Add more products here
      ],
    },
  },
};
