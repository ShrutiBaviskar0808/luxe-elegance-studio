import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useShop } from "@/context/ShopContext";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart } = useShop();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 border-b border-foreground/10 bg-background/95 backdrop-blur-md"
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to shop</span>
          </Link>
          <h1 className="font-display text-lg tracking-tight text-foreground">
            PIPA Jewellery
          </h1>
          <div className="w-24" />
        </div>
      </motion.div>

      {/* Main Content */}
      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6"
        >
          <div className="text-center max-w-md">
            <h2 className="font-display text-2xl text-foreground mb-2">
              Your cart is empty
            </h2>
            <p className="text-foreground/60 mb-6">
              Add some beautiful pieces to your collection before checking out.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-onyx to-foreground text-background font-semibold hover:shadow-lg transition-shadow"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      ) : (
        <CheckoutForm />
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-t border-foreground/10 bg-foreground/2 py-8 mt-12"
      >
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">
            Hand-finished Luxury Jewellery
          </p>
          <p className="text-sm text-foreground/60">
            © 2026 PIPA Jewellery. All rights reserved. | Secure checkout powered
            by Razorpay
          </p>
        </div>
      </motion.div>
    </div>
  );
}
