/* eslint-disable prettier/prettier */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Loader2, CheckCircle2, XCircle, Lock } from "lucide-react";
import { useShop, getProductById } from "@/context/ShopContext";
import { openRazorpay } from "@/lib/razorpay";
import { toast } from "sonner";

type Status = "idle" | "loading" | "success" | "failed";

export default function CheckoutModal() {
  const { checkoutOpen, setCheckoutOpen, cart, cartSubtotal, clearCart, setCartOpen } = useShop();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const shipping = cartSubtotal > 4999 ? 0 : 149;
  const total = cartSubtotal + shipping;

   
  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const close = () => {
    if (status === "loading") return;
    setCheckoutOpen(false);
    setTimeout(() => {
      setStatus("idle");
      setPaymentId(null);
    }, 300);
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name";
    if (!/^\d{10}$/.test(form.phone.trim())) return "Enter a valid 10-digit mobile";
    if (!form.address.trim() || !form.city.trim()) return "Please add a shipping address";
    if (!/^\d{6}$/.test(form.pincode.trim())) return "Enter a valid 6-digit pincode";
    return null;
  };

  const pay = async () => {
    const err = validate();
    if (err) return toast.error(err);
    if (cart.length === 0) return toast.error("Your bag is empty");

    setStatus("loading");
    try {
      await openRazorpay({
        amount: Math.round(total * 100),
        name: "PIPA Jewellery",
        description: `${cart.length} item${cart.length > 1 ? "s" : ""} · Luxury order`,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        notes: { address: `${form.address}, ${form.city} - ${form.pincode}` },
        theme: { color: "#1a1a1a" },
        handler: (resp) => {
          setPaymentId(resp.razorpay_payment_id);
          setStatus("success");
          clearCart();
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });
    } catch {
      setStatus("failed");
      toast.error("Unable to start payment");
    }
  };

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-90 bg-onyx/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 240 }}
            className="fixed inset-0 z-91 flex items-end sm:items-center justify-center p-0 sm:p-6 pointer-events-none"
          >
            <div className="pointer-events-auto w-full sm:max-w-5xl max-h-[95vh] sm:max-h-[90vh] bg-background rounded-t-3xl sm:rounded-3xl shadow-luxe overflow-hidden flex flex-col">
              <header className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-foreground/10">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gold" />
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em]">Secure Checkout</p>
                </div>
                <button
                  onClick={close}
                  disabled={status === "loading"}
                  className="p-2 rounded-full hover:bg-foreground/5 disabled:opacity-40"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              {status === "success" ? (
                <div className="flex-1 overflow-y-auto px-6 py-12 sm:py-16 flex flex-col items-center justify-center text-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 14 }}
                    className="h-20 w-20 grid place-items-center rounded-full bg-gradient-gold shadow-glow"
                  >
                    <CheckCircle2 className="h-10 w-10 text-onyx" />
                  </motion.div>
                  <h3 className="font-display text-3xl sm:text-4xl">Payment received</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Thank you, {form.name.split(" ")[0]}. A confirmation will be sent to{" "}
                    {form.email || "your email"} shortly.
                  </p>
                  {paymentId && (
                    <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                      Ref · {paymentId}
                    </p>
                  )}
                  <button
                    onClick={close}
                    className="mt-4 rounded-full bg-foreground text-background px-7 py-3.5 text-[11px] uppercase tracking-[0.28em] hover:opacity-90"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : status === "failed" ? (
                <div className="flex-1 overflow-y-auto px-6 py-12 sm:py-16 flex flex-col items-center justify-center text-center gap-4">
                  <div className="h-20 w-20 grid place-items-center rounded-full bg-destructive/10">
                    <XCircle className="h-10 w-10 text-destructive" />
                  </div>
                  <h3 className="font-display text-3xl">Payment failed</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Something went wrong. No amount was charged. Please try again.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 rounded-full bg-foreground text-background px-7 py-3.5 text-[11px] uppercase tracking-[0.28em]"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto grid lg:grid-cols-5">
                  {/* Form */}
                  <div className="lg:col-span-3 p-5 sm:p-8 space-y-5">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl">Shipping & Contact</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        We deliver across India with insured shipping.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Full name" value={form.name} onChange={onChange("name")} placeholder="Jane Doe" />
                      <Field label="Mobile" value={form.phone} onChange={onChange("phone")} placeholder="10-digit number" inputMode="numeric" maxLength={10} />
                      <Field label="Email (optional)" value={form.email} onChange={onChange("email")} placeholder="you@email.com" type="email" wide />
                      <div className="sm:col-span-2">
                        <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Address</label>
                        <textarea
                          value={form.address}
                          onChange={onChange("address")}
                          rows={2}
                          placeholder="House / Street / Landmark"
                          className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none transition"
                        />
                      </div>
                      <Field label="City" value={form.city} onChange={onChange("city")} placeholder="Mumbai" />
                      <Field label="Pincode" value={form.pincode} onChange={onChange("pincode")} placeholder="400001" inputMode="numeric" maxLength={6} />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                      <ShieldCheck className="h-4 w-4 text-gold" />
                      256-bit encrypted payment powered by Razorpay
                    </div>
                  </div>

                  {/* Summary */}
                  <aside className="lg:col-span-2 bg-cream p-5 sm:p-8 lg:border-l border-foreground/10 space-y-5">
                    <h4 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Order Summary
                    </h4>
                    <ul className="space-y-4 max-h-60 overflow-y-auto pr-1">
                      {cart.map((c) => {
                        const p = getProductById(c.id);
                        if (!p) return null;
                        return (
                          <li key={c.id} className="flex gap-3">
                            <div className="relative h-16 w-14 rounded-lg overflow-hidden bg-background shrink-0">
                              <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 grid place-items-center rounded-full bg-foreground text-background text-[10px]">
                                {c.qty}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-serif text-sm leading-tight truncate">{p.name}</p>
                              <p className="text-[11px] text-muted-foreground">{p.category}</p>
                            </div>
                            <p className="text-sm tabular-nums">
                              ₹{(p.price * c.qty).toLocaleString()}
                            </p>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="space-y-2 pt-4 border-t border-foreground/10 text-sm">
                      <Row label="Subtotal" value={`₹${cartSubtotal.toLocaleString()}`} />
                      <Row
                        label="Shipping"
                        value={shipping === 0 ? "Free" : `₹${shipping}`}
                        accent={shipping === 0}
                      />
                      <div className="flex justify-between items-center pt-3 border-t border-foreground/10">
                        <span className="text-[11px] uppercase tracking-[0.3em]">Total</span>
                        <span className="font-serif text-2xl text-gold">₹{total.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={pay}
                      disabled={status === "loading" || cart.length === 0}
                      className="shine group w-full inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-gradient-gold hover:text-onyx transition-all shadow-luxe hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing
                        </>
                      ) : (
                        <>
                          <Lock className="h-3.5 w-3.5" />
                          Pay ₹{total.toLocaleString()}
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        close();
                        setTimeout(() => setCartOpen(true), 200);
                      }}
                      className="w-full text-[11px] uppercase tracking-[0.28em] text-muted-foreground hover:text-foreground transition"
                    >
                      ← Edit bag
                    </button>
                  </aside>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  wide,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{label}</label>
      <input
        {...rest}
        className="mt-1.5 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm focus:border-gold focus:outline-none transition"
      />
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent ? "text-gold font-medium" : ""}>{value}</span>
    </div>
  );
}
