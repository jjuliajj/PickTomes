import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScholarsGallery from "@/components/ScholarsGallery";
import { getBooks } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors & Visionary Scholars Gallery | PickTomes Vault",
  description: "Meet the brilliant minds, essayists, and researchers behind our digital e-book library collection.",
};

export default async function AuthorsPage() {
  const books = await getBooks();

  return (
    <main className="flex min-h-screen flex-col bg-[#F4F6F8]">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
          <ScholarsGallery initialBooks={books} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
