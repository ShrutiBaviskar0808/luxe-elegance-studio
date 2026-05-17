import { useEffect } from "react";
import { loadRazorpayScript } from "@/lib/razorpay";

/**
 * Component to load Razorpay script when application mounts
 * Place this in your root layout
 */
export function RazorpayScriptLoader() {
  useEffect(() => {
    // Load Razorpay script on app initialization
    loadRazorpayScript().catch((error) => {
      console.warn("Failed to load Razorpay script:", error);
    });
  }, []);

  return null;
}

export default RazorpayScriptLoader;
