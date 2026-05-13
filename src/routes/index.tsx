import { createFileRoute } from "@tanstack/react-router";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Trending from "@/components/Trending";
import Collections from "@/components/Collections";
import NewArrival from "@/components/NewArrival";
import PromoBanner from "@/components/PromoBanner";
import BestSellers from "@/components/BestSellers";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import ReachOut from "@/components/ReachOut";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import QuickViewModal from "@/components/QuickViewModal";
import { ShopProvider } from "@/context/ShopContext";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "PIPA Jewellery — Hand-finished Luxury Fine Jewellery" },
      {
        name: "description",
        content:
          "PIPA Jewellery — handcrafted luxury fine jewellery designed to elevate every moment. Discover new arrivals, bestsellers, and signature collections.",
      },
      { property: "og:title", content: "PIPA Jewellery — Hand-finished Luxury Fine Jewellery" },
      {
        property: "og:description",
        content:
          "Timeless elegance crafted for every woman. Hand-finished fine jewellery from the PIPA atelier.",
      },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1600&q=85",
      },
    ],
  }),
});

function Index() {
  return (
    <ShopProvider>
      <main className="bg-background text-foreground">
        <AnnouncementBar />
        <Navbar />
        <Hero />
        <Trending />
        <Collections />
        <NewArrival />
        <PromoBanner />
        <BestSellers />
        <About />
        <Testimonials />
        <InstagramFeed />
        <ReachOut />
        <Footer />
      </main>
      <SearchOverlay />
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <Toaster position="bottom-right" />
    </ShopProvider>
  );
}
