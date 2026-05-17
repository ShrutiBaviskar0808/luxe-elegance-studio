/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
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

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface RazorpayPaymentOptions {
  key: string;
  amount: number;
  currency: string;
  order_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  receipt?: string;
  description: string;
  image?: string;
  theme?: {
    color: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}



// Initialize Razorpay - must be called after script loads
export const initializeRazorpay = (): boolean => {
  return !!window.Razorpay;
};

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if script already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Create Razorpay order (calls your backend API)
export const createRazorpayOrder = async (
  amount: number,
  receipt: string
): Promise<RazorpayOrder | null> => {
  try {
    // For demo/frontend only - using Razorpay Payment Links instead
    // In production, call your backend: POST /api/orders
    return {
      id: `order_${Date.now()}`,
      amount,
      currency: "INR",
      receipt,
      status: "created",
    };
  } catch (error) {
    console.error("Failed to create order:", error);
    return null;
  }
};

// Open Razorpay checkout modal
export const openRazorpayCheckout = (
  options: RazorpayPaymentOptions,
  onSuccess: (response: RazorpayResponse) => void,
   
  onError: (error: any) => void
): void => {
  if (!window.Razorpay) {
    onError(new Error("Razorpay SDK not loaded"));
    return;
  }

  const razorpayOptions = {
    ...options,
    handler: onSuccess,
    modal: {
      ondismiss: () => {
        onError(new Error("Payment cancelled"));
      },
    },
  };

  try {
    const razorpay = new window.Razorpay(razorpayOptions);
    razorpay.open();
  } catch (error) {
    onError(error);
  }
};

// Verify payment signature (call from backend for production)
export const verifyPaymentSignature = async (
  paymentId: string,
  orderId: string,
  signature: string
): Promise<boolean> => {
  try {
    // In production, call your backend: POST /api/verify-payment
    // For now, return true for demo
    return true;
  } catch (error) {
    console.error("Payment verification failed:", error);
    return false;
  }
};

// Format amount for Razorpay (convert to paise)
export const formatAmountForRazorpay = (amount: number): number => {
  return Math.round(amount * 100);
};

// Format amount for display
export const formatDisplayAmount = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};
