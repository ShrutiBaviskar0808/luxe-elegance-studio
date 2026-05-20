import type { Product } from "@/data/products";

export type CategorySlug =
  | "tarnish-jewellery"
  | "oxidish-jewellery"
  | "cuties-gift-hampers"
  | "additions";

export type CollectionSection = {
  title: string;
  description: string;
  products: Product[];
};

export type CategoryCollection = {
  title: string;
  description: string;
  heroImage: string;
  sections: CollectionSection[];
};

type Draft = {
  name: string;
  image: string;
  description: string;
  price: number;
  material: string;
  badge?: Product["badge"];
  oldPrice?: number;
  gallery?: string[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildProducts = (
  collectionSlug: CategorySlug,
  collectionTitle: string,
  sectionTitle: string,
  drafts: Draft[],
) =>
  drafts.map((draft, index) => ({
    id: `${collectionSlug}-${slugify(sectionTitle)}-${index + 1}`,
    name: draft.name,
    category: sectionTitle,
    collection: collectionTitle,
    subcategory: sectionTitle,
    price: draft.price,
    oldPrice: draft.oldPrice,
    image: draft.image,
    gallery: draft.gallery ?? [draft.image, draft.image, draft.image],
    badge: draft.badge,
    material: draft.material,
    description: draft.description,
  }));

const tarnishTitle = "Tarnish Jewellery";
const oxidishTitle = "Oxidish Jewellery";
const cutiesTitle = "Cuties / Gift Hampers";
const additionsTitle = "Additions";

const tarnishSlug: CategorySlug = "tarnish-jewellery";
const oxidishSlug: CategorySlug = "oxidish-jewellery";
const cutiesSlug: CategorySlug = "cuties-gift-hampers";
const additionsSlug: CategorySlug = "additions";

const tarnishSections: CollectionSection[] = [
  {
    title: "Earrings",
    description: "Luminous everyday drops, hoops, and studs with a polished tarnish-friendly finish.",
    products: buildProducts(tarnishSlug, tarnishTitle, "Earrings", [
      {
        name: "Aurelia Drop Earrings",
        image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
        description: "Sculpted gold-tone drops with a soft mirror shine.",
        price: 8400,
        material: "Gold-plated brass",
        badge: "New",
      },
      {
        name: "Lumiere Hoop Earrings",
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
        description: "Airy hoops with a fluid silhouette for day-to-evening wear.",
        price: 6700,
        material: "Tarnish-resistant alloy",
        badge: "Bestseller",
      },
      {
        name: "Mira Solitaire Studs",
        image: "https://images.unsplash.com/photo-1620656798932-902a85a48d50?auto=format&fit=crop&w=900&q=80",
        description: "Minimal studs with a single luminous accent stone.",
        price: 5400,
        material: "Gold-plated brass, crystal",
      },
      {
        name: "Aria Chandelier Earrings",
        image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=900&q=80",
        description: "Statement drops with layered movement and warm reflections.",
        price: 12200,
        material: "Gold-tone alloy",
        badge: "Limited",
      },
      {
        name: "Selene Pearl Drops",
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80",
        description: "Pearl drops framed in fine gold plating for a timeless finish.",
        price: 7200,
        material: "Gold-plated brass, pearls",
      },
      {
        name: "Noor Crystal Studs",
        image: "https://images.unsplash.com/photo-1593795899768-947c4929449d?auto=format&fit=crop&w=900&q=80",
        description: "Sparkling studs with a clean and elegant profile.",
        price: 4800,
        material: "Brass, crystal",
        badge: "Trending",
      },
    ]),
  },
  {
    title: "Bangles",
    description: "Stackable bangles and cuffs with a clean, luxe finish.",
    products: buildProducts(tarnishSlug, tarnishTitle, "Bangles", [
      {
        name: "Elysian Cuff Bangle",
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
        description: "A sleek open cuff with a high-gloss gold sheen.",
        price: 9200,
        material: "Gold-plated brass",
        badge: "Bestseller",
      },
      {
        name: "Sora Stack Bangle",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
        description: "Slim stackable bangle designed for easy layering.",
        price: 6800,
        material: "Tarnish-resistant alloy",
      },
      {
        name: "Marlow Dome Bangle",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
        description: "Bold dome profile with a smooth, reflective surface.",
        price: 10400,
        material: "Gold-plated brass",
        badge: "Limited",
      },
      {
        name: "Astra Textured Bangle",
        image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80",
        description: "Hammered texture that catches the light beautifully.",
        price: 7900,
        material: "Brass, matte gold plating",
      },
      {
        name: "Velour Heritage Cuff",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
        description: "A refined cuff with a heritage-inspired contour.",
        price: 11800,
        material: "Gold-plated brass",
        badge: "New",
      },
      {
        name: "Luna Slim Bangle",
        image: "https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&w=900&q=80",
        description: "Delicate and stack-ready with an ultra-fine profile.",
        price: 5600,
        material: "Tarnish-resistant alloy",
      },
    ]),
  },
  {
    title: "Chain",
    description: "Layer-friendly chains that bring subtle shine to every look.",
    products: buildProducts(tarnishSlug, tarnishTitle, "Chain", [
      {
        name: "Soleil Link Chain",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
        description: "A polished chain with softly rounded links.",
        price: 9500,
        material: "Gold-plated brass",
        badge: "Trending",
      },
      {
        name: "Nocturne Layer Chain",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
        description: "A slightly bolder chain ideal for layered styling.",
        price: 11200,
        material: "Tarnish-resistant alloy",
      },
      {
        name: "Étoile Paperclip Chain",
        image: "https://images.unsplash.com/photo-1535632066274-1c2253d324d7?auto=format&fit=crop&w=900&q=80",
        description: "Minimal paperclip links with a high-luxury polish.",
        price: 8700,
        material: "Gold-plated brass",
      },
      {
        name: "Orion Drape Chain",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
        description: "Fluid chain drape with a modern editorial feel.",
        price: 12800,
        material: "Gold-tone alloy",
        badge: "Limited",
      },
      {
        name: "Mila Collar Chain",
        image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=900&q=80",
        description: "A close-fit collar chain for elegant neckline framing.",
        price: 9900,
        material: "Gold-plated brass",
      },
      {
        name: "Seren Fine Chain",
        image: "https://images.unsplash.com/photo-1606800066031-28c8f0e3f1f1?auto=format&fit=crop&w=900&q=80",
        description: "A feather-light chain with a clean, understated glow.",
        price: 6200,
        material: "Tarnish-resistant alloy",
      },
    ]),
  },
  {
    title: "Bracelet",
    description: "Elegant bracelets made for stacking, gifting, and everyday wear.",
    products: buildProducts(tarnishSlug, tarnishTitle, "Bracelet", [
      {
        name: "Vienne Tennis Bracelet",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
        description: "A classic tennis bracelet with refined sparkle.",
        price: 18200,
        oldPrice: 21000,
        material: "Gold-plated brass, crystals",
        badge: "New",
      },
      {
        name: "Belle Pearl Bracelet",
        image: "https://images.unsplash.com/photo-1551122089-4e3e72477432?auto=format&fit=crop&w=900&q=80",
        description: "Pearl accents set in a delicate gold-toned chain.",
        price: 9600,
        material: "Gold-plated brass, pearls",
      },
      {
        name: "Cara Gold Bangle Bracelet",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
        description: "A polished bracelet with a bangle-inspired shape.",
        price: 12400,
        material: "Gold-plated brass",
      },
      {
        name: "Layla Charm Bracelet",
        image: "https://images.unsplash.com/photo-1535632066274-1c2253d324d7?auto=format&fit=crop&w=900&q=80",
        description: "A charm bracelet with delicate movement and shine.",
        price: 8900,
        material: "Gold-tone alloy",
        badge: "Trending",
      },
      {
        name: "Anya Chain Bracelet",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
        description: "A fine bracelet designed to stack beautifully.",
        price: 5800,
        material: "Tarnish-resistant alloy",
      },
      {
        name: "Reya Cuff Bracelet",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
        description: "A structured cuff with a modern sculptural profile.",
        price: 14800,
        material: "Gold-plated brass",
        badge: "Limited",
      },
    ]),
  },
  {
    title: "Anklet",
    description: "Lightweight anklets with graceful movement and warm shine.",
    products: buildProducts(tarnishSlug, tarnishTitle, "Anklet", [
      {
        name: "Astra Anklet",
        image: "https://images.unsplash.com/photo-1551122089-4e3e72477432?auto=format&fit=crop&w=900&q=80",
        description: "A fine anklet with tiny polished beads.",
        price: 5200,
        material: "Gold-tone alloy",
      },
      {
        name: "Naya Charm Anklet",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
        description: "A charming anklet with subtle dangling accents.",
        price: 6100,
        material: "Gold-plated brass",
        badge: "New",
      },
      {
        name: "Selin Pearl Anklet",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
        description: "Pearl details add a gentle, luminous finish.",
        price: 7800,
        material: "Gold-plated brass, pearls",
      },
      {
        name: "Kira Link Anklet",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
        description: "A layered-link anklet for a more modern look.",
        price: 6900,
        material: "Tarnish-resistant alloy",
      },
      {
        name: "Mira Barefoot Anklet",
        image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
        description: "A barely-there anklet with delicate sparkle.",
        price: 4700,
        material: "Gold-tone alloy",
      },
      {
        name: "Lea Festival Anklet",
        image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=900&q=80",
        description: "Designed for festive moments and easy layering.",
        price: 8400,
        material: "Gold-plated brass",
        badge: "Bestseller",
      },
    ]),
  },
  {
    title: "Hand Chain",
    description: "Elegant hand chains with a graceful, statement finish.",
    products: buildProducts(tarnishSlug, tarnishTitle, "Hand Chain", [
      {
        name: "Zara Hand Chain",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
        description: "A delicate hand chain with refined wrist-to-finger drape.",
        price: 7400,
        material: "Gold-plated brass",
        badge: "New",
      },
      {
        name: "Mira Palm Chain",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
        description: "A polished chain that moves elegantly across the hand.",
        price: 8800,
        material: "Gold-tone alloy",
      },
      {
        name: "Ari Hand Harness",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
        description: "A fashion-forward hand harness with soft shimmer.",
        price: 9300,
        material: "Gold-plated brass",
      },
      {
        name: "Talia Minimal Chain",
        image: "https://images.unsplash.com/photo-1551122089-4e3e72477432?auto=format&fit=crop&w=900&q=80",
        description: "Minimal and elegant, ideal for modern occasion dressing.",
        price: 6600,
        material: "Tarnish-resistant alloy",
      },
      {
        name: "Eden Draped Hand Chain",
        image: "https://images.unsplash.com/photo-1535632066274-1c2253d324d7?auto=format&fit=crop&w=900&q=80",
        description: "Layered drape with a soft, luxe finish.",
        price: 10400,
        material: "Gold-plated brass",
        badge: "Limited",
      },
      {
        name: "Nina Festival Hand Chain",
        image: "https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&w=900&q=80",
        description: "Festive detailing with a comfortable adjustable fit.",
        price: 7900,
        material: "Gold-tone alloy",
      },
    ]),
  },
];

const oxidishSections: CollectionSection[] = [
  {
    title: "Earrings",
    description: "Traditional silver-tone earrings with filigree, oxidised finishes, and festive flair.",
    products: buildProducts(oxidishSlug, oxidishTitle, "Earrings", [
      {
        name: "Jhumka Radiance Earrings",
        image: "https://images.unsplash.com/photo-1561828995-aa79f7ea50e7?auto=format&fit=crop&w=900&q=80",
        description: "Classic dome jhumkas with etched detailing and antique silver tone.",
        price: 4200,
        material: "Oxidised silver",
        badge: "Bestseller",
      },
      {
        name: "Madhuri Drop Earrings",
        image: "https://images.unsplash.com/photo-1629224316810-40fcf7d2f31d?auto=format&fit=crop&w=900&q=80",
        description: "Elegant drops with tiny bells and a heritage look.",
        price: 5100,
        material: "Oxidised silver alloy",
      },
      {
        name: "Kashi Flower Studs",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80",
        description: "Floral studs inspired by temple jewellery motifs.",
        price: 3600,
        material: "Oxidised silver",
      },
      {
        name: "Raga Crescent Drops",
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
        description: "A crescent silhouette with traditional engraving.",
        price: 5900,
        material: "Oxidised silver-plated brass",
        badge: "New",
      },
      {
        name: "Anvi Bell Earrings",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
        description: "Festive bell drops that move with a soft chime.",
        price: 6400,
        material: "Oxidised silver",
      },
      {
        name: "Veda Mandala Earrings",
        image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=900&q=80",
        description: "Mandala-inspired earrings with deep antique toning.",
        price: 7200,
        material: "Oxidised silver alloy",
        badge: "Limited",
      },
    ]),
  },
  {
    title: "Rings",
    description: "Statement and stackable rings with traditional carved detail.",
    products: buildProducts(oxidishSlug, oxidishTitle, "Rings", [
      {
        name: "Aadi Temple Ring",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
        description: "A temple-style ring with ornate floral embossing.",
        price: 5600,
        material: "Oxidised silver",
        badge: "Bestseller",
      },
      {
        name: "Nandini Coin Ring",
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80",
        description: "A coin motif ring with a vintage finish.",
        price: 4700,
        material: "Oxidised silver alloy",
      },
      {
        name: "Kriti Filigree Ring",
        image: "https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=900&q=80",
        description: "Delicate filigree work in a comfortable stackable profile.",
        price: 6100,
        material: "Oxidised silver",
      },
      {
        name: "Meera Shield Ring",
        image: "https://images.unsplash.com/photo-1598560917505-59a3ad60e16c?auto=format&fit=crop&w=900&q=80",
        description: "A bold shield shape with antique silver depth.",
        price: 7300,
        material: "Oxidised silver-plated brass",
        badge: "New",
      },
      {
        name: "Tara Spiral Ring",
        image: "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?auto=format&fit=crop&w=900&q=80",
        description: "A gently spiraled ring for easy everyday styling.",
        price: 3900,
        material: "Oxidised silver",
      },
      {
        name: "Gita Heritage Band",
        image: "https://images.unsplash.com/photo-1596944946297-cfc6a4f4a536?auto=format&fit=crop&w=900&q=80",
        description: "Classic heritage band with fine line engraving.",
        price: 6800,
        material: "Oxidised silver alloy",
        badge: "Limited",
      },
    ]),
  },
  {
    title: "Kada",
    description: "Heavier bangles and kada styles for traditional styling.",
    products: buildProducts(oxidishSlug, oxidishTitle, "Kada", [
      {
        name: "Rajya Kada",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
        description: "A bold kada with geometric engraving and heritage weight.",
        price: 8800,
        material: "Oxidised silver alloy",
        badge: "Bestseller",
      },
      {
        name: "Swarna Lotus Kada",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
        description: "Lotus-inspired details with a deep antique patina.",
        price: 10200,
        material: "Oxidised silver",
      },
      {
        name: "Vedic Spiral Kada",
        image: "https://images.unsplash.com/photo-1535632066274-1c2253d324d7?auto=format&fit=crop&w=900&q=80",
        description: "Spiral motifs crafted for a rich festive statement.",
        price: 9400,
        material: "Oxidised silver-plated brass",
      },
      {
        name: "Prisha Open Kada",
        image: "https://images.unsplash.com/photo-1551122089-4e3e72477432?auto=format&fit=crop&w=900&q=80",
        description: "An open kada with a comfortable adjustable fit.",
        price: 7900,
        material: "Oxidised silver",
        badge: "New",
      },
      {
        name: "Kumari Floral Kada",
        image: "https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&w=900&q=80",
        description: "Floral embossing with a striking oxidised surface.",
        price: 11100,
        material: "Oxidised silver alloy",
      },
      {
        name: "Nitya Temple Cuff",
        image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=900&q=80",
        description: "Temple-inspired cuff for bridal and festive looks.",
        price: 12300,
        material: "Oxidised silver",
        badge: "Limited",
      },
    ]),
  },
  {
    title: "Payal",
    description: "Anklet-style payals with a soft metallic jingle and ethnic touch.",
    products: buildProducts(oxidishSlug, oxidishTitle, "Payal", [
      {
        name: "Riva Bell Payal",
        image: "https://images.unsplash.com/photo-1620656798932-902a85a48d50?auto=format&fit=crop&w=900&q=80",
        description: "A delicate payal with tiny bell charms.",
        price: 3900,
        material: "Oxidised silver",
        badge: "New",
      },
      {
        name: "Rani Anklet Payal",
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80",
        description: "Traditional anklet styling with classic jingle detail.",
        price: 4700,
        material: "Oxidised silver alloy",
      },
      {
        name: "Mehka Chain Payal",
        image: "https://images.unsplash.com/photo-1593795899768-947c4929449d?auto=format&fit=crop&w=900&q=80",
        description: "A fine chain payal with an elegant vintage finish.",
        price: 5200,
        material: "Oxidised silver",
      },
      {
        name: "Bela Lotus Payal",
        image: "https://images.unsplash.com/photo-1561172317-c64a767e2d6c?auto=format&fit=crop&w=900&q=80",
        description: "Lotus accents add a softly festive traditional feel.",
        price: 6100,
        material: "Oxidised silver-plated brass",
        badge: "Bestseller",
      },
      {
        name: "Saanvi Heritage Payal",
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
        description: "Heritage inspired ankle jewellery with a richer weight.",
        price: 7400,
        material: "Oxidised silver",
      },
      {
        name: "Ira Festive Payal",
        image: "https://images.unsplash.com/photo-1606800066031-28c8f0e3f1f1?auto=format&fit=crop&w=900&q=80",
        description: "An ornate payal styled for gifting and celebration.",
        price: 8300,
        material: "Oxidised silver alloy",
        badge: "Limited",
      },
    ]),
  },
  {
    title: "Belt",
    description: "Occasion belts and waist chains with traditional oxidised styling.",
    products: buildProducts(oxidishSlug, oxidishTitle, "Belt", [
      {
        name: "Samira Waist Belt",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
        description: "A polished waist belt for sarees and festive draping.",
        price: 13500,
        material: "Oxidised silver alloy",
        badge: "New",
      },
      {
        name: "Moksha Temple Belt",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
        description: "Temple motifs give this belt a bridal-inspired feel.",
        price: 16200,
        material: "Oxidised silver",
      },
      {
        name: "Asha Coin Belt",
        image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
        description: "Coin detailing brings movement and vintage charm.",
        price: 14800,
        material: "Oxidised silver-plated brass",
      },
      {
        name: "Kalini Draped Belt",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
        description: "A draped belt with antique silver highlights.",
        price: 17400,
        material: "Oxidised silver",
        badge: "Limited",
      },
      {
        name: "Vedha Art Belt",
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80",
        description: "Artful metal work with a ceremonial silhouette.",
        price: 15600,
        material: "Oxidised silver alloy",
      },
      {
        name: "Anika Statement Belt",
        image: "https://images.unsplash.com/photo-1551122089-4e3e72477432?auto=format&fit=crop&w=900&q=80",
        description: "A strong statement piece with rich traditional tone.",
        price: 18900,
        material: "Oxidised silver",
        badge: "Bestseller",
      },
    ]),
  },
  {
    title: "Necklace Set",
    description: "Classic oxidised necklace sets styled with matching earrings and pendant motifs.",
    products: buildProducts(oxidishSlug, oxidishTitle, "Necklace Set", [
      {
        name: "Maya Bridal Set",
        image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80",
        description: "A coordinated necklace set with bridal-inspired detailing.",
        price: 18500,
        material: "Oxidised silver",
        badge: "Bestseller",
      },
      {
        name: "Kira Temple Set",
        image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=900&q=80",
        description: "Temple motifs and matching elements for festive occasions.",
        price: 17200,
        material: "Oxidised silver alloy",
      },
      {
        name: "Aditi Layer Set",
        image: "https://images.unsplash.com/photo-1598560917505-59a3ad60e16c?auto=format&fit=crop&w=900&q=80",
        description: "Layered necklace set with a balanced antique shine.",
        price: 19600,
        material: "Oxidised silver",
      },
      {
        name: "Nila Jali Set",
        image: "https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=900&q=80",
        description: "Jali-inspired patterns and matching earrings.",
        price: 20400,
        material: "Oxidised silver-plated brass",
        badge: "Limited",
      },
      {
        name: "Ishita Heritage Set",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
        description: "Heritage styling with a comfortable wear profile.",
        price: 16200,
        material: "Oxidised silver",
      },
      {
        name: "Devi Ethnic Set",
        image: "https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&w=900&q=80",
        description: "An ethnic necklace set with rich visual weight.",
        price: 21400,
        material: "Oxidised silver alloy",
        badge: "New",
      },
    ]),
  },
];

const cutiesSections: CollectionSection[] = [
  {
    title: "Hampers",
    description: "Gift-ready boxes with curated jewellery and festive presentation.",
    products: buildProducts(cutiesSlug, cutiesTitle, "Hampers", [
      {
        name: "Festive Glow Box",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80",
        description: "A curated gift box with earrings and a matching bracelet.",
        price: 5200,
        material: "Gold-plated brass, pearl accents",
        badge: "New",
      },
      {
        name: "Royal Treat Hamper",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80",
        description: "A luxe hamper with layered pieces and wrapped packaging.",
        price: 6900,
        material: "Mixed metal jewellery set",
      },
      {
        name: "Petal Surprise Box",
        image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=900&q=80",
        description: "Soft, feminine pieces arranged for gifting and unboxing.",
        price: 4800,
        material: "Gold-tone alloy, crystals",
      },
      {
        name: "Celebration Keepsake Kit",
        image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=900&q=80",
        description: "A premium keepsake kit with jewellery and festive packaging.",
        price: 7700,
        material: "Gold-plated brass",
        badge: "Bestseller",
      },
      {
        name: "Sweet Moments Box",
        image: "https://images.unsplash.com/photo-1506629905607-d99b86c0b41c?auto=format&fit=crop&w=900&q=80",
        description: "A cute, giftable box with charm-driven jewellery pieces.",
        price: 3900,
        material: "Gold-plated brass, stones",
      },
      {
        name: "Festive Luxe Hamper",
        image: "https://images.unsplash.com/photo-1558174685-f0c1f318dda7?auto=format&fit=crop&w=900&q=80",
        description: "A more premium hamper for birthdays and festive gifting.",
        price: 9200,
        material: "Mixed metal jewellery set",
        badge: "Limited",
      },
    ]),
  },
];

const additionsSections: CollectionSection[] = [
  {
    title: "Charms",
    description: "Delicate charms to personalise bracelets, necklaces, and keepsakes.",
    products: buildProducts(additionsSlug, additionsTitle, "Charms", [
      {
        name: "Heart Glow Charm",
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
        description: "A polished heart charm with a soft reflective finish.",
        price: 1800,
        material: "Gold-plated brass",
      },
      {
        name: "Starlet Charm",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
        description: "A star charm that brings a subtle sparkle to any chain.",
        price: 2200,
        material: "Gold-tone alloy",
        badge: "New",
      },
      {
        name: "Luna Disc Charm",
        image: "https://images.unsplash.com/photo-1598560917505-59a3ad60e16c?auto=format&fit=crop&w=900&q=80",
        description: "A clean disc charm with a polished minimalist feel.",
        price: 2000,
        material: "Gold-plated brass",
      },
      {
        name: "Petite Clover Charm",
        image: "https://images.unsplash.com/photo-1602752250015-52934bc45613?auto=format&fit=crop&w=900&q=80",
        description: "A tiny clover charm crafted for everyday personalization.",
        price: 2100,
        material: "Tarnish-resistant alloy",
      },
    ]),
  },
  {
    title: "Mini Pendants",
    description: "Small pendants that layer beautifully on fine chains.",
    products: buildProducts(additionsSlug, additionsTitle, "Mini Pendants", [
      {
        name: "Tiny Pearl Pendant",
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80",
        description: "A petite pearl drop pendant for delicate layering.",
        price: 2600,
        material: "Gold-plated brass, pearl",
      },
      {
        name: "Celeste Drop Pendant",
        image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=80",
        description: "A small drop pendant with a polished golden surface.",
        price: 2400,
        material: "Gold-tone alloy",
      },
      {
        name: "Mica Heart Pendant",
        image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=900&q=80",
        description: "A sweet heart pendant designed for gifting and stacking.",
        price: 2800,
        material: "Gold-plated brass",
        badge: "Bestseller",
      },
      {
        name: "Nova Coin Pendant",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80",
        description: "A tiny coin pendant with a modern antique finish.",
        price: 3000,
        material: "Tarnish-resistant alloy",
      },
    ]),
  },
  {
    title: "Stacking Rings",
    description: "Fine rings designed for layering and mixing metals.",
    products: buildProducts(additionsSlug, additionsTitle, "Stacking Rings", [
      {
        name: "Aero Thin Band",
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80",
        description: "A slim stacking band with a smooth mirror finish.",
        price: 3100,
        material: "Gold-plated brass",
      },
      {
        name: "Moss Twist Ring",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
        description: "A twisted ring that layers neatly with other bands.",
        price: 3300,
        material: "Gold-tone alloy",
        badge: "New",
      },
      {
        name: "Halo Micro Ring",
        image: "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?auto=format&fit=crop&w=900&q=80",
        description: "A refined micro ring with a whisper-light silhouette.",
        price: 2900,
        material: "Tarnish-resistant alloy",
      },
      {
        name: "Nova Curve Ring",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80",
        description: "A curved band that adds depth to ring stacks.",
        price: 3600,
        material: "Gold-plated brass",
        badge: "Limited",
      },
    ]),
  },
  {
    title: "Ear Cuffs",
    description: "Modern cuffs and climbers for a subtle statement look.",
    products: buildProducts(additionsSlug, additionsTitle, "Ear Cuffs", [
      {
        name: "Auric Cuff",
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80",
        description: "A polished cuff with a sleek, minimal silhouette.",
        price: 2300,
        material: "Gold-plated brass",
      },
      {
        name: "Petal Ear Climber",
        image: "https://images.unsplash.com/photo-1620656798932-902a85a48d50?auto=format&fit=crop&w=900&q=80",
        description: "A floral climber that hugs the ear beautifully.",
        price: 2600,
        material: "Gold-tone alloy",
      },
      {
        name: "Lark Crystal Cuff",
        image: "https://images.unsplash.com/photo-1561172317-c64a767e2d6c?auto=format&fit=crop&w=900&q=80",
        description: "Crystal accents bring a brighter, dressier finish.",
        price: 3500,
        material: "Gold-plated brass, crystal",
        badge: "Bestseller",
      },
      {
        name: "Edge Sculpt Cuff",
        image: "https://images.unsplash.com/photo-1593795899768-947c4929449d?auto=format&fit=crop&w=900&q=80",
        description: "A sharper sculptural cuff with contemporary edge.",
        price: 3100,
        material: "Tarnish-resistant alloy",
      },
    ]),
  },
  {
    title: "Layered Chains",
    description: "Easy-to-wear layered chains with clean luxury styling.",
    products: buildProducts(additionsSlug, additionsTitle, "Layered Chains", [
      {
        name: "Muse Layer Chain",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
        description: "A two-layer chain set with a polished gold tone.",
        price: 5400,
        material: "Gold-plated brass",
      },
      {
        name: "Flora Multi Chain",
        image: "https://images.unsplash.com/photo-1606800066031-28c8f0e3f1f1?auto=format&fit=crop&w=900&q=80",
        description: "Layered fine chains that sit neatly at the collarbone.",
        price: 6100,
        material: "Tarnish-resistant alloy",
        badge: "New",
      },
      {
        name: "Aura Coin Layer",
        image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=900&q=80",
        description: "Coin details add dimension to this layered chain.",
        price: 5900,
        material: "Gold-tone alloy",
      },
      {
        name: "Noir Twin Chain",
        image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
        description: "A twin chain set with a refined evening glow.",
        price: 6800,
        material: "Gold-plated brass",
        badge: "Limited",
      },
    ]),
  },
];

export const categorySlugs: Record<CategorySlug, CategoryCollection> = {
  [tarnishSlug]: {
    title: tarnishTitle,
    description: "Hand-finished · Made to Last",
    heroImage:
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1400&q=85",
    sections: tarnishSections,
  },
  [oxidishSlug]: {
    title: oxidishTitle,
    description: "Heritage silver-tone craft",
    heroImage:
      "https://images.unsplash.com/photo-1561828995-aa79f7ea50e7?auto=format&fit=crop&w=1400&q=85",
    sections: oxidishSections,
  },
  [cutiesSlug]: {
    title: cutiesTitle,
    description: "Curated boxes to gift",
    heroImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1400&q=85",
    sections: cutiesSections,
  },
  [additionsSlug]: {
    title: additionsTitle,
    description: "Extra accessory products",
    heroImage:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1400&q=85",
    sections: additionsSections,
  },
};

export const allCollectionProducts = Object.values(categorySlugs).flatMap((collection) =>
  collection.sections.flatMap((section) => section.products),
);

export const isCategorySlug = (s: string): s is CategorySlug =>
  Object.prototype.hasOwnProperty.call(categorySlugs, s);

export type CategoryProduct = Product;

// ============================================================
// Subcategory routing — flat slug-based collection pages
// (e.g. /collections/earrings, /collections/bangles, /collections/rings)
// Aggregates products across parent collections that share a subcategory.
// ============================================================

export type SubcategoryCollection = {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
  parents: string[];
  products: Product[];
};

const subcategorySlugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const subcategoryHeroFallback =
  "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1400&q=85";

const subcategoryAccumulator = new Map<string, SubcategoryCollection>();
(Object.entries(categorySlugs) as Array<[CategorySlug, CategoryCollection]>).forEach(
  ([, collection]) => {
    collection.sections.forEach((section) => {
      const slug = subcategorySlugify(section.title);
      const existing = subcategoryAccumulator.get(slug);
      if (existing) {
        existing.products.push(...section.products);
        if (!existing.parents.includes(collection.title))
          existing.parents.push(collection.title);
      } else {
        subcategoryAccumulator.set(slug, {
          slug,
          title: section.title,
          description: section.description,
          heroImage: section.products[0]?.image ?? subcategoryHeroFallback,
          parents: [collection.title],
          products: [...section.products],
        });
      }
    });
  },
);

export const subcategorySlugs: Record<string, SubcategoryCollection> =
  Object.fromEntries(subcategoryAccumulator);

export const isSubcategorySlug = (s: string): boolean =>
  Object.prototype.hasOwnProperty.call(subcategorySlugs, s);
