import { useState } from "react";
import PaymentButton from "@/components/PaymentButton";
import { formatDisplayAmount } from "@/lib/razorpay";

/**
 * PAYMENT BUTTON IMPLEMENTATION EXAMPLES
 *
 * Copy and paste these examples into your components
 * to add payment functionality throughout the site.
 */

// ------------------------------------------------------------
// 1. PRODUCT CARD - Add to ProductCard.tsx
// ------------------------------------------------------------

export function ProductCardExample() {
  const product = {
    name: "Emerald Statement Earrings",
    price: 45000,
    image: "...",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/10">
      <img src={product.image} alt={product.name} className="h-80 w-full object-cover" />
      <div className="p-6">
        <h3 className="mb-2 font-display text-2xl">{product.name}</h3>
        <p className="mb-6 font-display text-3xl text-gold">{formatDisplayAmount(product.price)}</p>
        <PaymentButton label="Add to Cart & Buy" size="lg" fullWidth variant="primary" />
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// 2. HERO SECTION - Add CTA button to Hero.tsx
// ------------------------------------------------------------

export function HeroSectionExample() {
  return (
    <section className="bg-linear-to-b from-cream to-background flex min-h-screen items-center justify-center">
      <div className="max-w-3xl px-6 text-center">
        <h1 className="mb-4 font-display text-6xl">Hand-Finished Luxury Jewellery</h1>
        <p className="mb-8 text-xl text-foreground/60">
          Discover exquisite pieces designed to elevate every moment.
        </p>
        <div className="flex justify-center gap-4">
          <PaymentButton label="Shop Now" size="lg" variant="primary" />
          <PaymentButton label="Learn More" size="lg" variant="outline" />
        </div>
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// 3. COLLECTION CARD - Add to Collections.tsx
// ------------------------------------------------------------

export function CollectionCardExample() {
  return (
    <div className="group relative h-80 overflow-hidden rounded-2xl">
      <img
        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
        alt="Necklaces"
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-onyx/90 to-transparent p-6">
        <h3 className="mb-3 font-display text-3xl text-ivory">Necklaces</h3>
        <PaymentButton label="Explore Collection" size="md" variant="secondary" fullWidth />
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// 4. BESTSELLER CARD - Add to BestSellers.tsx
// ------------------------------------------------------------

export function BestsellerCardExample() {
  const item = {
    name: "Gold Plated Kundan Earrings",
    price: 32000,
    image: "...",
    rating: 4.9,
    reviews: 128,
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-foreground/10 transition hover:border-gold/30">
      <div className="relative">
        <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-onyx">
          Bestseller
        </span>
        <img src={item.image} alt={item.name} className="h-64 w-full object-cover" />
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs text-foreground/60">
            {"\u2b50"} {item.rating} ({item.reviews})
          </p>
        </div>
        <h4 className="mb-2 font-display text-lg">{item.name}</h4>
        <p className="mb-4 font-display text-xl text-gold">{formatDisplayAmount(item.price)}</p>
        <PaymentButton label="Buy Now" size="md" fullWidth variant="primary" />
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// 5. PROMO SECTION - Add to PromoBanner.tsx
// ------------------------------------------------------------

export function PromoBannerExample() {
  return (
    <section className="bg-linear-to-r from-gold/20 to-champagne/20 px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 font-display text-4xl">New Arrival - Limited Edition</h2>
        <p className="mb-8 text-lg text-foreground/70">
          Exclusive pieces available for a limited time only.
        </p>
        <PaymentButton label="Shop Limited Edition" size="lg" variant="primary" />
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// 6. QUICK VIEW MODAL - Add to QuickViewModal.tsx
// ------------------------------------------------------------

export function QuickViewModalExample() {
  const product = {
    id: "prod_123",
    name: "Diamond Pendant Necklace",
    price: 125000,
    description: "Exquisite 18K gold pendant with certified diamonds",
    image: "...",
  };

  return (
    <div className="max-w-2xl rounded-2xl bg-background p-8">
      <div className="grid grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="rounded-xl" />
        <div>
          <h2 className="mb-2 font-display text-3xl">{product.name}</h2>
          <p className="mb-4 font-display text-2xl text-gold">
            {formatDisplayAmount(product.price)}
          </p>
          <p className="mb-6 text-foreground/70">{product.description}</p>

          <div className="space-y-3">
            <PaymentButton label="Buy Now" size="lg" fullWidth variant="primary" />
            <PaymentButton label="Add to Wishlist" size="lg" fullWidth variant="outline" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// 7. TESTIMONIAL SECTION - Add CTA to Testimonials.tsx
// ------------------------------------------------------------

export function TestimonialSectionExample() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-2xl italic">
          "These pieces are absolute treasures. The quality and craftsmanship exceeded my
          expectations."
        </p>
        <p className="mb-8 font-semibold">- Sarah M., Verified Buyer</p>
        <PaymentButton label="Get Your Treasures Now" size="lg" variant="primary" />
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// 8. INSTAGRAM FEED - Add CTA below feed
// ------------------------------------------------------------

export function InstagramFeedCTAExample() {
  return (
    <div className="mt-12 text-center">
      <h3 className="mb-4 font-display text-2xl">Follow us on Instagram</h3>
      <p className="mb-6 text-foreground/60">See our latest collections and styling inspiration</p>
      <PaymentButton label="Shop Similar Styles" size="lg" variant="primary" />
    </div>
  );
}

// ------------------------------------------------------------
// 9. FOOTER - Add links to checkout
// ------------------------------------------------------------

export function FooterPaymentLinksExample() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 grid grid-cols-3 gap-8">
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-gold">
                  Shop All
                </a>
              </li>
              <li>
                <PaymentButton label="Checkout" variant="outline" size="sm" />
              </li>
              <li>
                <a href="/" className="hover:text-gold">
                  Track Order
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ------------------------------------------------------------
// BONUS: Custom Payment Dialog
// ------------------------------------------------------------

export function CustomPaymentDialog() {
  const [showPayment, setShowPayment] = useState(false);
  const amount = 50000;

  return (
    <div>
      <button
        onClick={() => setShowPayment(true)}
        className="rounded-full bg-gold px-6 py-3 font-semibold text-onyx"
      >
        Quick Pay {formatDisplayAmount(amount)}
      </button>

      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 max-w-md rounded-2xl bg-background p-8">
            <h2 className="mb-4 font-display text-2xl">Complete Payment</h2>
            <p className="mb-6 text-foreground/60">
              Amount: <span className="font-display text-gold">{formatDisplayAmount(amount)}</span>
            </p>
            <PaymentButton label="Proceed to Payment" fullWidth size="lg" variant="primary" />
            <button
              onClick={() => setShowPayment(false)}
              className="mt-3 w-full rounded-full border border-foreground px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
