import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const messages = [
  "Free Shipping on orders above ₹999",
  "New Arrivals · Live Now",
  "Luxury Jewellery Collection · Hand-finished",
  "Festive Edit · Up to 20% off select pieces",
];

export default function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % messages.length), 3500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="bg-onyx text-ivory text-[10.5px] uppercase tracking-[0.32em]">
      <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-ivory/90"
          >
            ✦ {messages[i]} ✦
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
