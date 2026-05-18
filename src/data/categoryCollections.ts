export type DemoProduct = {
  name: string;
  image: string;
  description: string;
  price: string;
  material: string;
};

export type DemoCollection = {
  description: string;
  subcategories: Record<string, DemoProduct[]>;
};

export const demoProducts: Record<string, DemoCollection> = {
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
      ],
      Bangles: [
        {
          name: "Gold Cuff Bangle",
          image: "/images/tarnish/bangles1.jpg",
          description: "Minimalist gold cuff bangle with a sleek design.",
          price: "$200",
          material: "Gold-plated brass",
        },
      ],
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
      ],
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
      ],
    },
  },
};

export type CategoryCollection = {
  title: string;
  products: DemoProduct[];
};

export const categorySlugs = {
  "tarnish-jewellery": {
    title: "Tarnish Jewellery",
    products: [
      ...demoProducts["Tarnish Jewellery"].subcategories.Earrings,
      ...demoProducts["Tarnish Jewellery"].subcategories.Bangles,
    ],
  },
  "oxidish-jewellery": {
    title: "Oxidish Jewellery",
    products: demoProducts["Oxidish Jewellery"].subcategories.Earrings,
  },
  "cuties-gift-hampers": {
    title: "Cuties / Gift Hampers",
    products: demoProducts["Cuties / Gift Hampers"].subcategories.Hampers,
  },
  additions: {
    title: "Additions",
    products: demoProducts["Additions"].subcategories.Charms,
  },
} satisfies Record<string, CategoryCollection>;

export type CategorySlug = keyof typeof categorySlugs;

export const isCategorySlug = (s: string): s is CategorySlug =>
  Object.prototype.hasOwnProperty.call(categorySlugs, s);

export type CategoryProduct = DemoProduct;
