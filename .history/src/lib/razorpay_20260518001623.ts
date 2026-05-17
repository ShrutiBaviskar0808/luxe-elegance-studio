/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */

export const RAZORPAY_KEY =
  (import.meta as any).env?.VITE_RAZORPAY_KEY ||
  "rzp_test_1DP5mmOlF5G5ag";

declare global {
  interface Window {
    Razorpay: any;
  }
}

let loading: Promise<boolean> | null = null;

// Load Razorpay SDK
export function loadRazorpay(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (loading) return loading;

  loading = new Promise((resolve) => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      loading = null;
      resolve(false);
    };

    document.body.appendChild(script);
  });

  return loading;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayOptions {
  amount: number;
  name: string;
  description?: string;

  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };

  notes?: Record<string, string>;

  theme?: {
    color?: string;
  };

  handler: (response: RazorpayResponse) => void;

  modal?: {
    ondismiss?: () => void;
  };
}

// Open Razorpay checkout
export async function openRazorpay(
  options: RazorpayOptions
): Promise<void> {
  const loaded = await loadRazorpay();

  if (!loaded || !window.Razorpay) {
    throw new Error("Razorpay SDK failed to load");
  }

  const razorpay = new window.Razorpay({
    key: RAZORPAY_KEY,
    currency: "INR",
    ...options,
  });

  razorpay.open();
}

// Convert ₹ to paise
export const formatAmountForRazorpay = (
  amount: number
): number => {
  return Math.round(amount * 100);
};

// Display INR nicely
export const formatDisplayAmount = (
  amount: number
): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
};