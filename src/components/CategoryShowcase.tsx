import { byCategory } from "@/data/products";
import ProductCarousel from "./ProductCarousel";

export default function CategoryShowcase() {
  return (
    <div>
      <ProductCarousel
        id="earrings"
        bg="background"
        eyebrow="Shop Category"
        title={<><em className="not-italic text-gradient-gold">Earrings</em></>}
        products={byCategory.Earrings}
      />
      <ProductCarousel
        id="rings"
        bg="cream"
        eyebrow="Shop Category"
        title={<><em className="not-italic text-gradient-gold">Rings</em></>}
        products={byCategory.Rings}
      />
      <ProductCarousel
        id="chains"
        bg="background"
        eyebrow="Shop Category"
        title={<>Chains & <em className="not-italic text-gradient-gold">Necklace Sets</em></>}
        products={byCategory.Necklaces}
      />
      <ProductCarousel
        id="bracelets"
        bg="cream"
        eyebrow="Shop Category"
        title={<>Bracelets, Bangles & <em className="not-italic text-gradient-gold">Anklets</em></>}
        products={byCategory.Bracelets}
      />
    </div>
  );
}
