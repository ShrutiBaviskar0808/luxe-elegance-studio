import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "New Arrival", href: "#new-arrival" },
  { label: "About Us", href: "#about" },
  { label: "Reach Out", href: "#reach-out" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4"
    >
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between rounded-full transition-all duration-500 ${
          scrolled
            ? "glass shadow-soft px-6 py-3"
            : "bg-transparent px-6 py-4"
        }`}
      >
        <a href="#home" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-[0.25em] text-foreground">
            MAISON<span className="text-gold">·</span>OR
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm uppercase tracking-[0.22em] text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.label}
              <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button aria-label="Search" className="p-2 rounded-full hover:bg-foreground/5 transition">
            <Search className="h-4 w-4" />
          </button>
          <button aria-label="Bag" className="p-2 rounded-full hover:bg-foreground/5 transition">
            <ShoppingBag className="h-4 w-4" />
          </button>
          <a
            href="#new-arrival"
            className="ml-2 inline-flex items-center rounded-full bg-foreground text-background text-xs uppercase tracking-[0.22em] px-5 py-2.5 hover:bg-foreground/85 transition"
          >
            Shop
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-full hover:bg-foreground/5"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-auto mt-3 max-w-7xl glass rounded-3xl p-6"
          >
            <nav className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-[0.22em] py-2 border-b border-foreground/10"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#new-arrival"
                onClick={() => setOpen(false)}
                className="mt-2 text-center rounded-full bg-foreground text-background text-xs uppercase tracking-[0.22em] px-5 py-3"
              >
                Shop Collection
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
