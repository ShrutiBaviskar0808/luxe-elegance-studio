import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewArrival from "@/components/NewArrival";
import Collections from "@/components/Collections";
import About from "@/components/About";
import ReachOut from "@/components/ReachOut";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Maison Or — Hand-finished Fine Jewelry" },
      {
        name: "description",
        content:
          "Maison Or — heirloom fine jewelry, hand-finished in our Jaipur atelier. Discover the new arrivals, signature collections, and bespoke commissions.",
      },
      { property: "og:title", content: "Maison Or — Hand-finished Fine Jewelry" },
      {
        property: "og:description",
        content: "Timeless brilliance, sculpted in light. Hand-finished fine jewelry made to be lived in.",
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
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <NewArrival />
      <Collections />
      <About />
      <ReachOut />
      <Footer />
    </main>
  );
}
