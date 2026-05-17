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

declare global {
  interface Window {
    Razorpay: any;
  }
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
