import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products as ALL_PRODUCTS, type Product } from "@/data/products";
import { toast } from "sonner";

export type CartItem = { id: string; qty: number };

type Category = "All" | Product["category"];

type ShopState = {
  // data
  products: Product[];
  // cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  // wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
  // ui state
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  // filter
  category: Category;
  setCategory: (c: Category) => void;
};

const ShopCtx = createContext<ShopState | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category>("All");

  // hydrate from localStorage on mount (client only)
  useEffect(() => {
    setCart(read<CartItem[]>("pipa.cart", []));
    setWishlist(read<string[]>("pipa.wishlist", []));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem("pipa.cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem("pipa.wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // lock scroll when any overlay open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const lock = cartOpen || wishlistOpen || searchOpen || !!quickView;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, wishlistOpen, searchOpen, quickView]);

  // ESC closes overlays
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setWishlistOpen(false);
        setSearchOpen(false);
        setQuickView(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const ex = prev.find((c) => c.id === id);
      if (ex) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c));
      return [...prev, { id, qty }];
    });
    const p = ALL_PRODUCTS.find((x) => x.id === id);
    toast.success("Added to bag", { description: p?.name });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((c) => c.id !== id)
        : prev.map((c) => (c.id === id ? { ...c, qty } : c)),
    );
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        toast("Removed from wishlist");
        return prev.filter((x) => x !== id);
      }
      toast.success("Saved to wishlist");
      return [...prev, id];
    });
  }, []);

  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const cartSubtotal = useMemo(
    () =>
      cart.reduce((sum, c) => {
        const p = ALL_PRODUCTS.find((x) => x.id === c.id);
        return sum + (p?.price ?? 0) * c.qty;
      }, 0),
    [cart],
  );

  const value: ShopState = {
    products: ALL_PRODUCTS,
    cart,
    cartCount,
    cartSubtotal,
    addToCart,
    removeFromCart,
    setQty,
    wishlist,
    toggleWishlist,
    isWished,
    cartOpen,
    setCartOpen,
    wishlistOpen,
    setWishlistOpen,
    searchOpen,
    setSearchOpen,
    quickView,
    setQuickView,
    category,
    setCategory,
  };

  return <ShopCtx.Provider value={value}>{children}</ShopCtx.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopCtx);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

export function getProductById(id: string) {
  return ALL_PRODUCTS.find((p) => p.id === id);
}
