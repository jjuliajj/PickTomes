import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#334155] font-manrope">
      <Navbar />
      <Hero />
      <FeaturedBooks />
      <Footer />
    </main>
  );
}
