import { bestSellers } from "@/data/products";
import ProductCarousel from "./ProductCarousel";

export default function BestSellers() {
  return (
    <ProductCarousel
      id="best-sellers"
      bg="background"
      eyebrow="The Bestsellers"
      title={<>Best <em className="not-italic text-gradient-gold">Sellers</em></>}
      products={bestSellers}
      ctaLabel="Shop bestsellers"
      ctaHref="#new-arrival"
    />
  );
}
