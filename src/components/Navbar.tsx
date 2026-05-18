import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ShoppingBag, Heart, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import Logo from "./Logo";
import { useShop } from "@/context/ShopContext";

// cSpell:ignore Oxidish Kada Payal

type Cat = "All" | "Earrings" | "Rings" | "Bracelets" | "Necklaces";

const links = [
  { label: "Home", href: "#home", category: "All" as Cat },
  { label: "New Arrival", href: "#new-arrival", category: "All" as Cat },
];

// Mega menu — Collections
type SubItem = { label: string; category: Cat };
type MegaGroup = { title: string; tagline: string; items: SubItem[] };

const collections: MegaGroup[] = [
  {
    title: "Tarnish Jewellery",
    tagline: "Anti-tarnish everyday luxe",
    items: [
      { label: "Earrings", category: "Earrings" },
      { label: "Bangles", category: "Bracelets" },
      { label: "Chain", category: "Necklaces" },
      { label: "Bracelet", category: "Bracelets" },
      { label: "Anklet", category: "Bracelets" },
      { label: "Hand Chain", category: "Bracelets" },
    ],
  },
  {
    title: "Oxidish Jewellery",
    tagline: "Heritage silver-tone craft",
    items: [
      { label: "Earrings", category: "Earrings" },
      { label: "Rings", category: "Rings" },
      { label: "Kada", category: "Bracelets" },
      { label: "Payal", category: "Bracelets" },
      { label: "Belt", category: "All" },
      { label: "Necklace Set", category: "Necklaces" },
    ],
  },
  {
    title: "Cuties / Gift Hampers",
    tagline: "Curated boxes to gift",
    items: [{ label: "Additions", category: "All" }],
  },
  {
    title: "Additions",
    tagline: "Accessories & layering",
    items: [
      { label: "Charms", category: "All" },
      { label: "Mini Pendants", category: "All" },
      { label: "Stacking Rings", category: "All" },
      { label: "Ear Cuffs", category: "All" },
      { label: "Layered Chains", category: "All" },
    ],
  },
];

const tail = [
  { label: "About Us", href: "#about", category: "All" as Cat },
  { label: "Reach Out", href: "#reach-out", category: "All" as Cat },
];

function smoothScroll(href: string) {
  if (!href.startsWith("#")) return;
  const el = document.getElementById(href.slice(1));
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileColOpen, setMobileColOpen] = useState<string | null>(null);
  const { setSearchOpen, setCartOpen, setWishlistOpen, cartCount, wishlist, setCategory } =
    useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useNavigate();

  const collectionRoutes: Record<string, string> = {
    "Tarnish Jewellery": "tarnish-jewellery",
    "Oxidish Jewellery": "oxidish-jewellery",
    "Cuties / Gift Hampers": "cuties-gift-hampers",
    Additions: "additions",
  };

  const handleNav = (e: React.MouseEvent, l: { href: string; category: Cat }) => {
    e.preventDefault();
    setCategory(l.category);
    setOpen(false);
    setMegaOpen(false);
    smoothScroll(l.href);
  };

  const goCollection = (groupTitle: string) => {
    const category = collectionRoutes[groupTitle] ?? "tarnish-jewellery";
    setOpen(false);
    setMegaOpen(false);
    setCategory("All");
    navigate({ to: "/$category", params: { category } });
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="sticky top-0 z-50"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled ? "glass shadow-soft" : "bg-background/85 backdrop-blur-md"
        }`}
      >
        {/* Top row — strict 3-zone layout: left icons | centered logo | right icons */}
        <div className="mx-auto max-w-7xl px-2 sm:px-6 flex items-center gap-1 sm:gap-3 py-2.5 sm:py-4">
          {/* Left zone */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 flex-1 min-w-0 justify-start">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="p-1.5 sm:p-2.5 rounded-full hover:bg-foreground/5 transition shrink-0"
            >
              <Search className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </button>
            <button
              aria-label="Menu"
              className="lg:hidden p-1.5 sm:p-2.5 rounded-full hover:bg-foreground/5 shrink-0"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>

          {/* Center logo */}
          <a
            href="#home"
            onClick={(e) => handleNav(e, { href: "#home", category: "All" })}
            className="shrink min-w-0 flex justify-center overflow-hidden px-1"
          >
            <Logo />
          </a>

          {/* Right zone */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 flex-1 min-w-0 justify-end">
            <button
              aria-label="Wishlist"
              onClick={() => setWishlistOpen(true)}
              className="relative p-1.5 sm:p-2.5 rounded-full hover:bg-foreground/5 transition shrink-0"
            >
              <Heart className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 grid place-items-center rounded-full bg-foreground text-background text-[9px]">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              aria-label="Bag"
              onClick={() => setCartOpen(true)}
              className="relative p-1.5 sm:p-2.5 rounded-full hover:bg-foreground/5 transition shrink-0"
            >
              <ShoppingBag className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 h-4 w-4 grid place-items-center rounded-full bg-gradient-gold text-onyx text-[9px]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Bottom nav (desktop) */}
        <nav
          className="hidden lg:flex items-center justify-center gap-9 border-t border-foreground/10 py-3 relative"
          onMouseLeave={() => setMegaOpen(false)}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleNav(e, l)}
              onMouseEnter={() => setMegaOpen(false)}
              className="group relative text-[11px] uppercase tracking-[0.3em] text-foreground/75 hover:text-foreground transition-colors"
            >
              {l.label}
              <span className="pointer-events-none absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}

          {/* Collections trigger */}
          <div className="relative" onMouseEnter={() => setMegaOpen(true)}>
            <button
              onClick={() => {
                setMegaOpen((m) => !m);
              }}
              className="group relative inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.3em] text-foreground/75 hover:text-foreground transition-colors"
            >
              Collections
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`}
              />
              <span className="pointer-events-none absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
            </button>
          </div>

          {tail.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleNav(e, l)}
              onMouseEnter={() => setMegaOpen(false)}
              className="group relative text-[11px] uppercase tracking-[0.3em] text-foreground/75 hover:text-foreground transition-colors"
            >
              {l.label}
              <span className="pointer-events-none absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-gold transition-all duration-500 group-hover:w-full" />
            </a>
          ))}

          {/* Mega menu panel */}
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                key="mega"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute left-1/2 top-full z-40 mt-3 w-[min(96vw,1040px)] -translate-x-1/2"
              >
                <div className="rounded-2xl border border-foreground/10 bg-background/95 backdrop-blur-xl shadow-luxe overflow-hidden">
                  <div className="grid grid-cols-4 divide-x divide-foreground/10">
                    {collections.map((g, gi) => (
                      <motion.div
                        key={g.title}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + gi * 0.06 }}
                        className="p-7"
                      >
                        <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/45">
                          {g.tagline}
                        </p>
                        <button
                          onClick={() => goCollection(g.title)}
                          className="mt-2 block font-display text-lg tracking-tight text-gradient-gold"
                        >
                          {g.title}
                        </button>
                        <ul className="mt-5 space-y-1.5">
                          {g.items.map((it) => (
                            <li key={it.label}>
                              <button
                                onClick={() => goCollection(g.title)}
                                className="group/item w-full flex items-center justify-between rounded-md px-3 py-2 text-[13px] text-foreground/75 hover:bg-foreground/5 hover:text-foreground transition-colors"
                              >
                                <span className="relative">
                                  {it.label}
                                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-gold transition-all duration-300 group-hover/item:w-full" />
                                </span>
                                <ChevronRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover/item:opacity-100 group-hover/item:translate-x-0 text-gold" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                  <div className="px-7 py-3 border-t border-foreground/10 bg-foreground/2 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.32em] text-foreground/55">
                      Hand-finished · Made to Last
                    </span>
                    <button
                      onClick={() => {
                        setCategory("All");
                        setMegaOpen(false);
                        smoothScroll("#collections");
                      }}
                      className="text-[11px] uppercase tracking-[0.28em] text-foreground hover:text-gold transition"
                    >
                      View All Collections →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Mobile menu */}
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

              {/* Collections accordion */}
              <div className="border-b border-foreground/10">
                <div className="text-sm uppercase tracking-[0.25em] py-3 text-foreground/85">
                  Collections
                </div>
                <div className="pb-2 space-y-1">
                  {collections.map((g) => {
                    const isOpen = mobileColOpen === g.title;
                    return (
                      <div key={g.title} className="rounded-lg overflow-hidden">
                        <button
                          onClick={() => setMobileColOpen(isOpen ? null : g.title)}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-[12px] uppercase tracking-[0.22em] bg-foreground/3 hover:bg-foreground/6 transition"
                        >
                          <span>{g.title}</span>
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              {g.items.map((it) => (
                                <li key={it.label}>
                                  <button
                                    onClick={() => goCollection(g.title)}
                                    className="w-full text-left px-5 py-2.5 text-[13px] text-foreground/75 hover:text-foreground hover:bg-foreground/5 transition"
                                  >
                                    {it.label}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {tail.map((l) => (
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
                onClick={(e) => handleNav(e, { href: "#collections", category: "All" })}
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
