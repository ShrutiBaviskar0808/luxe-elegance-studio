import PaymentButton from "@/components/PaymentButton";
import { formatDisplayAmount } from "@/lib/razorpay";

/**
 * PAYMENT BUTTON IMPLEMENTATION EXAMPLES
 * 
 * Copy and paste these examples into your components
 * to add payment functionality throughout the site
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. PRODUCT CARD - Add to ProductCard.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ProductCardExample() {
  const product = {
    name: "Emerald Statement Earrings",
    price: 45000,
    image: "...",
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-foreground/10">
      <img src={product.image} alt={product.name} className="w-full h-80 object-cover" />
      <div className="p-6">
        <h3 className="font-display text-2xl mb-2">{product.name}</h3>
        <p className="text-3xl text-gold font-display mb-6">
          {formatDisplayAmount(product.price)}
        </p>
        <PaymentButton
          label="Add to Cart & Buy"
          size="lg"
          fullWidth
          variant="primary"
        />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. HERO SECTION - Add CTA button to Hero.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function HeroSectionExample() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-cream to-background flex items-center justify-center">
      <div className="text-center max-w-3xl px-6">
        <h1 className="font-display text-6xl mb-4">
          Hand-Finished Luxury Jewellery
        </h1>
        <p className="text-xl text-foreground/60 mb-8">
          Discover exquisite pieces designed to elevate every moment.
        </p>
        <div className="flex gap-4 justify-center">
          <PaymentButton
            label="Shop Now"
            size="lg"
            variant="primary"
          />
          <PaymentButton
            label="Learn More"
            size="lg"
            variant="outline"
          />
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. COLLECTION CARD - Add to Collections.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CollectionCardExample() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-80 group">
      <img
        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
        alt="Necklaces"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 to-transparent flex flex-col justify-end p-6">
        <h3 className="font-display text-3xl text-ivory mb-3">Necklaces</h3>
        <PaymentButton
          label="Explore Collection"
          size="md"
          variant="secondary"
          fullWidth
        />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. BESTSELLER CARD - Add to BestSellers.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function BestsellerCardExample() {
  const item = {
    name: "Gold Plated Kundan Earrings",
    price: 32000,
    image: "...",
    rating: 4.9,
    reviews: 128,
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-foreground/10 hover:border-gold/30 transition">
      <div className="relative">
        <span className="absolute top-4 right-4 bg-gold text-onyx px-3 py-1 rounded-full text-xs font-semibold">
          Bestseller
        </span>
        <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-foreground/60">⭐ {item.rating} ({item.reviews})</p>
        </div>
        <h4 className="font-display text-lg mb-2">{item.name}</h4>
        <p className="text-xl text-gold font-display mb-4">
          {formatDisplayAmount(item.price)}
        </p>
        <PaymentButton
          label="Buy Now"
          size="md"
          fullWidth
          variant="primary"
        />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. PROMO SECTION - Add to PromoBanner.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function PromoBannerExample() {
  return (
    <section className="bg-gradient-to-r from-gold/20 to-champagne/20 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-4xl mb-4">
          New Arrival - Limited Edition
        </h2>
        <p className="text-lg text-foreground/70 mb-8">
          Exclusive pieces available for a limited time only.
        </p>
        <PaymentButton
          label="Shop Limited Edition"
          size="lg"
          variant="primary"
        />
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. QUICK VIEW MODAL - Add to QuickViewModal.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function QuickViewModalExample() {
  const product = {
    id: "prod_123",
    name: "Diamond Pendant Necklace",
    price: 125000,
    description: "Exquisite 18K gold pendant with certified diamonds",
    image: "...",
  };

  return (
    <div className="bg-background rounded-2xl p-8 max-w-2xl">
      <div className="grid grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="rounded-xl" />
        <div>
          <h2 className="font-display text-3xl mb-2">{product.name}</h2>
          <p className="text-2xl text-gold font-display mb-4">
            {formatDisplayAmount(product.price)}
          </p>
          <p className="text-foreground/70 mb-6">{product.description}</p>

          <div className="space-y-3">
            <PaymentButton
              label="Buy Now"
              size="lg"
              fullWidth
              variant="primary"
            />
            <PaymentButton
              label="Add to Wishlist"
              size="lg"
              fullWidth
              variant="outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. TESTIMONIAL SECTION - Add CTA to Testimonials.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function TestimonialSectionExample() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-2xl italic mb-4">
          "These pieces are absolute treasures. The quality and craftsmanship exceeded my expectations."
        </p>
        <p className="font-semibold mb-8">- Sarah M., Verified Buyer</p>
        <PaymentButton
          label="Get Your Treasures Now"
          size="lg"
          variant="primary"
        />
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. INSTAGRAM FEED - Add CTA below feed
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function InstagramFeedCTAExample() {
  return (
    <div className="text-center mt-12">
      <h3 className="font-display text-2xl mb-4">Follow us on Instagram</h3>
      <p className="text-foreground/60 mb-6">
        See our latest collections and styling inspiration
      </p>
      <PaymentButton
        label="Shop Similar Styles"
        size="lg"
        variant="primary"
      />
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. FOOTER - Add links to checkout
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FooterPaymentLinksExample() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-gold">Shop All</a></li>
              <li><PaymentButton label="Checkout" variant="outline" size="sm" /></li>
              <li><a href="/" className="hover:text-gold">Track Order</a></li>
            </ul>
          </div>

          {/* Rest of footer... */}
        </div>
      </div>
    </footer>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BONUS: Custom Payment Dialog
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState } from "react";

export function CustomPaymentDialog() {
  const [showPayment, setShowPayment] = useState(false);
  const amount = 50000;

  return (
    <div>
      <button
        onClick={() => setShowPayment(true)}
        className="px-6 py-3 bg-gold text-onyx rounded-full font-semibold"
      >
        Quick Pay {formatDisplayAmount(amount)}
      </button>

      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-2xl p-8 max-w-md w-full mx-4">
            <h2 className="font-display text-2xl mb-4">Complete Payment</h2>
            <p className="text-foreground/60 mb-6">
              Amount: <span className="text-gold font-display">{formatDisplayAmount(amount)}</span>
            </p>
            <PaymentButton
              label="Proceed to Payment"
              fullWidth
              size="lg"
            />
            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-3 px-4 py-2 border border-foreground rounded-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
