import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FBF9F5] text-slate-900 font-sans">
      <Navbar />
      <Hero />
      <FeaturedBooks />
      <Footer />
    </main>
  );
}
