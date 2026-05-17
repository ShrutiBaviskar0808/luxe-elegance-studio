// Lightweight loader for Razorpay Checkout
// Uses the public test key for demo flow. Replace VITE_RAZORPAY_KEY for live.
export const RAZORPAY_KEY =
  (import.meta as any).env?.VITE_RAZORPAY_KEY || "rzp_test_1DP5mmOlF5G5ag";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

let loading: Promise<boolean> | null = null;

export function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (loading) return loading;
  loading = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => {
      loading = null;
      resolve(false);
    };
    document.body.appendChild(s);
  });
  return loading;
}

export type RazorpayOptions = {
  amount: number; // paise
  name: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler: (response: { razorpay_payment_id: string }) => void;
  modal?: { ondismiss?: () => void };
};

export async function openRazorpay(opts: RazorpayOptions) {
  const ok = await loadRazorpay();
  if (!ok || !window.Razorpay) throw new Error("Razorpay failed to load");
  const rzp = new window.Razorpay({
    key: RAZORPAY_KEY,
    currency: "INR",
    ...opts,
  });
  rzp.open();
  return rzp;
}
