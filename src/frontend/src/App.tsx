import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import AdminPage from "./components/AdminPage";
import BannerSection from "./components/BannerSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductsSection from "./components/ProductsSection";

const queryClient = new QueryClient();

export default function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.hash === "#admin");

  useEffect(() => {
    const handler = () => setIsAdmin(window.location.hash === "#admin");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? (
        <AdminPage />
      ) : (
        <div className="min-h-screen bg-background text-foreground font-body">
          <Navbar />
          <main>
            <HeroSection />
            <ProductsSection />
            <BannerSection />
            <AboutSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}
