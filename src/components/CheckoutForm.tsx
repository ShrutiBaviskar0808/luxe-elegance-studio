import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, AlertCircle, CheckCircle, Loader } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  loadRazorpayScript,
  createRazorpayOrder,
  openRazorpayCheckout,
  formatAmountForRazorpay,
  formatDisplayAmount,
  type RazorpayResponse,
} from "@/lib/razorpay";
import { toast } from "sonner";

export function CheckoutForm() {
  const { cart, cartSubtotal } = useShop();
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setPaymentError("Please enter your name");
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setPaymentError("Please enter a valid email");
      return false;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setPaymentError("Please enter a valid phone number");
      return false;
    }
    if (!formData.address.trim()) {
      setPaymentError("Please enter your address");
      return false;
    }
    if (!formData.city.trim()) {
      setPaymentError("Please enter your city");
      return false;
    }
    if (!formData.pincode.trim() || formData.pincode.length < 6) {
      setPaymentError("Please enter a valid pincode");
      return false;
    }
    return true;
  };

  const handlePayment = useCallback(async () => {
    setPaymentError(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Validate cart
    if (cart.length === 0) {
      setPaymentError("Your cart is empty");
      return;
    }

    setPaymentLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay SDK");
      }

      // Create order
      const receipt = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const order = await createRazorpayOrder(cartSubtotal, receipt);

      if (!order) {
        throw new Error("Failed to create payment order");
      }

      // Prepare Razorpay options
      const amount = formatAmountForRazorpay(cartSubtotal);
      const logoImage = `${window.location.origin}/images/pipa-logo.svg`;

      const options = {
        key: "rzp_live_YOUR_KEY_ID", // Replace with your Razorpay key
        amount: amount,
        currency: "INR",
        order_id: order.id,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        receipt: receipt,
        description: `Purchase from PIPA Jewellery - ${cart.length} items`,
        image: logoImage,
        theme: {
          color: "#1a1a1a", // Premium black
        },
      };

      // Open Razorpay checkout
      openRazorpayCheckout(
        options,
        (response: RazorpayResponse) => {
          // Payment successful
          setPaymentSuccess(true);
          toast.success("Payment successful! Your order has been confirmed.", {
            duration: 5000,
          });
          console.log("Payment successful:", response);
          // Clear form after 2 seconds
          setTimeout(() => {
            setFormData({
              name: "",
              email: "",
              phone: "",
              address: "",
              city: "",
              pincode: "",
            });
            setPaymentSuccess(false);
          }, 2000);
        },
        (error: unknown) => {
          // Payment failed
          const errorMessage =
            error instanceof Error ? error.message : "Payment failed. Please try again.";
          setPaymentError(errorMessage);
          toast.error(errorMessage);
          console.error("Payment error:", error);
        },
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setPaymentError(errorMessage);
      toast.error(errorMessage);
      console.error("Checkout error:", error);
    } finally {
      setPaymentLoading(false);
    }
  }, [cart.length, cartSubtotal, formData.email, formData.name, formData.phone, validateForm]);

  const totalAmount = cartSubtotal;

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl tracking-tight text-foreground">Secure Checkout</h1>
          <p className="mt-2 text-sm text-foreground/60">
            Complete your purchase of hand-finished luxury jewellery
          </p>
        </div>

        <div className="space-y-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-foreground/10 bg-foreground/2 p-6"
          >
            <h2 className="font-display text-xl text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">Items in cart:</span>
                <span className="font-medium text-foreground">{cart.length}</span>
              </div>
              <div className="flex items-center justify-between border-t border-foreground/10 pt-3">
                <span className="font-display text-lg text-foreground">Total Amount</span>
                <span className="font-display text-2xl text-gradient-gold">
                  {formatDisplayAmount(totalAmount)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Customer Details Form */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <h2 className="font-display text-xl text-foreground">Delivery Details</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={paymentLoading}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={paymentLoading}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={paymentLoading}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium">
                  City *
                </Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={paymentLoading}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Delivery Address *
              </Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter your complete delivery address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={paymentLoading}
                rows={3}
                className="resize-none bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-sm font-medium">
                Pincode *
              </Label>
              <Input
                id="pincode"
                name="pincode"
                type="text"
                placeholder="6 digit pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                disabled={paymentLoading}
                className="bg-background"
              />
            </div>
          </motion.div>

          {/* Error Message */}
          {paymentError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-lg border border-red-200/50 bg-red-50/50 p-4 text-sm text-red-700"
            >
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Payment Error</p>
                <p className="mt-1 text-red-600/90">{paymentError}</p>
              </div>
            </motion.div>
          )}

          {/* Success Message */}
          {paymentSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-start gap-3 rounded-lg border border-green-200/50 bg-green-50/50 p-4 text-sm text-green-700"
            >
              <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Payment Successful!</p>
                <p className="mt-1 text-green-600/90">
                  Your order has been confirmed. Check your email for details.
                </p>
              </div>
            </motion.div>
          )}

          {/* Payment Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handlePayment}
              disabled={paymentLoading || cart.length === 0 || paymentSuccess}
              size="lg"
              className="w-full h-12 bg-linear-to-r from-onyx to-foreground hover:from-onyx/90 hover:to-foreground/90 text-background font-semibold tracking-wide text-base transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {paymentLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Processing Payment...</span>
                </div>
              ) : paymentSuccess ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Order Confirmed</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Complete Purchase • {formatDisplayAmount(totalAmount)}</span>
                </div>
              )}
            </Button>
          </motion.div>

          {/* Payment Methods Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg border border-foreground/10 bg-foreground/2 p-4 text-center"
          >
            <p className="text-xs uppercase tracking-widest text-foreground/50 mb-3">
              Secure Payment Gateway
            </p>
            <p className="text-sm text-foreground/70">
              We accept UPI • Cards • Net Banking • Digital Wallets
            </p>
            <p className="mt-2 text-xs text-foreground/50">
              Powered by Razorpay • SSL Encrypted • 100% Secure
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
