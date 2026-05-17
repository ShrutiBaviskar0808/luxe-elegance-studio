import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Loader } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export interface PaymentButtonProps {
  label?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-base",
};

const variantClasses = {
  primary:
    "bg-gradient-to-r from-onyx to-foreground hover:from-onyx/90 hover:to-foreground/90 text-background font-semibold",
  secondary:
    "bg-gold hover:bg-gold/90 text-onyx font-semibold",
  outline:
    "border-2 border-foreground bg-transparent hover:bg-foreground/5 text-foreground font-semibold",
};

export function PaymentButton({
  label = "Buy Now",
  showIcon = true,
  size = "md",
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled = false,
  onClick,
}: PaymentButtonProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (onClick) {
        await onClick();
      } else {
        // Navigate to checkout page
        navigate({ to: "/checkout" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-full
        tracking-wide
        transition-all duration-300
        hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader className="h-4 w-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {showIcon && <ShoppingBag className="h-4 w-4" />}
          <span>{label}</span>
        </>
      )}
    </motion.button>
  );
}

export default PaymentButton;
