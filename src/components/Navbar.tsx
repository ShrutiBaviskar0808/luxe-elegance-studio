import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, Heart } from "lucide-react";
import Logo from "./Logo";
import { useShop } from "@/context/ShopContext";

const links = [
  { label: "Home", href: "#home", category: "All" as const },
  { label: "New Arrival", href: "#new-arrival", category: "All" as const },
  { label: "Collections", href: "#collections", category: "All" as const },
  { label: "Earrings", href: "#new-arrival", category: "Earrings" as const },
  { label: "Rings", href: "#new-arrival", category: "Rings" as const },
  { label: "Bracelets", href: "#new-arrival", category: "Bracelets" as const },
  { label: "About Us", href: "#about", category: "All" as const },
  { label: "Reach Out", href: "#reach-out", category: "All" as const },
];

function smoothScroll(href: string) {
  if (!href.startsWith("#")) return;
  const el = document.getElementById(href.slice(1));
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { setSearchOpen, setCartOpen, setWishlistOpen, cartCount, wishlist, setCategory } =
    useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (
    e: React.MouseEvent,
    l: { href: string; category: "All" | "Earrings" | "Rings" | "Bracelets" | "Necklaces" },
  ) => {
    e.preventDefault();
    setCategory(l.category);
    setOpen(false);
    smoothScroll(l.href);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="sticky top-0 z-50"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled ? "glass shadow-soft" : "bg-background/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between py-4">
          <a
            href="#home"
            onClick={(e) => handleNav(e, { href: "#home", category: "All" })}
            className="flex items-center gap-2"
          >
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {links.slice(0, 6).map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => handleNav(e, l)}
                className="group relative text-[11px] uppercase tracking-[0.25em] text-foreground/80 hover:text-foreground transition-colors"
              >
                {l.label}
                <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full hover:bg-foreground/5 transition"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              aria-label="Wishlist"
              onClick={() => setWishlistOpen(true)}
              className="relative hidden sm:grid p-2.5 place-items-center rounded-full hover:bg-foreground/5 transition"
            >
              <Heart className="h-4 w-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 grid place-items-center rounded-full bg-foreground text-background text-[9px] font-medium">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              aria-label="Bag"
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-foreground/5 transition"
            >
              <ShoppingBag className="h-4 w-4" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 h-4 w-4 grid place-items-center rounded-full bg-gradient-gold text-onyx text-[9px] font-medium"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              aria-label="Menu"
              className="lg:hidden ml-1 p-2.5 rounded-full hover:bg-foreground/5"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-foreground/10 overflow-hidden"
          >
            <nav className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleNav(e, l)}
                  className="text-sm uppercase tracking-[0.25em] py-3 border-b border-foreground/10"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={(e) => handleNav(e, { href: "#new-arrival", category: "All" })}
                className="mt-4 rounded-full bg-foreground text-background text-xs uppercase tracking-[0.25em] px-5 py-3"
              >
                Shop Collection
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
