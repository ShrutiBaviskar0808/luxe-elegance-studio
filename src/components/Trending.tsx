import { trending } from "@/data/products";
import ProductCarousel from "./ProductCarousel";

export default function Trending() {
  return (
    <ProductCarousel
      id="trending"
      bg="cream"
      eyebrow="Trending Now"
      title={<>Most <em className="not-italic text-gradient-gold">Loved</em></>}
      products={trending}
    />
  );
}
