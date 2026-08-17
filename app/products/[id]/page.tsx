import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartActions from "@/components/AddToCartActions";
import BookDescription from "@/components/BookDescription";
import { getBook } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers, User, Tag } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    return {
      title: "Book Not Found | eBookMarket Library",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bookpatr.vercel.app";
  const rawDesc = (book.description || "").replace(/<[^>]*>?/gm, "").trim();
  const cleanDescription = rawDesc.slice(0, 160) || `Download ${book.title} by ${book.author} in digital EPUB format from eBookMarket Library.`;

  return {
    title: `${book.title} by ${book.author}`,
    description: cleanDescription,
    keywords: [book.title, book.author, book.category, "EPUB eBook", "Digital Book", "Buy eBook"],
    openGraph: {
      title: `${book.title} by ${book.author}`,
      description: cleanDescription,
      url: `${siteUrl}/products/${book.id}`,
      type: "article",
      images: book.cover_url ? [{ url: book.cover_url, alt: book.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} by ${book.author}`,
      description: cleanDescription,
      images: book.cover_url ? [book.cover_url] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bookpatr.vercel.app";
  const rawPrice = String(book.price || "0.50").replace(/[^0-9.]/g, "");
  const numericPrice = parseFloat(rawPrice) || 0.50;
  const cleanDescription = (book.description || "").replace(/<[^>]*>?/gm, "").trim();

  // Product Schema for Google Search & Stripe Trust verification
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": book.title,
    "image": book.cover_url ? [book.cover_url] : [],
    "description": cleanDescription || `${book.title} by ${book.author}`,
    "category": book.category,
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/products/${book.id}`,
      "priceCurrency": "USD",
      "price": numericPrice.toFixed(2),
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "eBookMarket Library"
      }
    },
    "brand": {
      "@type": "Brand",
      "name": book.author
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#090D16] font-sans text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      
      <section className="pt-36 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          {/* Back link */}
          <Link href="/collections" className="inline-flex items-center text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors mb-8 uppercase tracking-widest gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Collection
          </Link>

          {/* Main Book Detail Grid */}
          <div className="bg-slate-900/80 rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl grid md:grid-cols-12 gap-8 lg:gap-12 items-start backdrop-blur-xl">
            
            {/* Left: Compact 9:16 Book Cover */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative aspect-[9/16] w-full max-w-[300px] bg-slate-950 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)] border border-slate-800 group">
                {book.cover_url ? (
                  <img
                    src={book.cover_url}
                    alt={book.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-500 font-cormorant text-xl italic p-6 text-center">
                    <BookOpen className="w-8 h-8 mb-2 opacity-40 text-amber-400" />
                    <span>{book.title}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Book Meta & Info */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-amber-500/30">
                  <Tag className="w-3 h-3 text-amber-400" />
                  {book.category}
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-cormorant font-black text-white leading-tight mb-2">
                  {book.title}
                </h1>
                
                <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>By <strong className="text-slate-200">{book.author}</strong></span>
                </div>
              </div>

              {/* Price & Delivery Badge */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-inner">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Digital EPUB Edition</span>
                  <span className="text-3xl font-cormorant font-black text-amber-400">{book.price || "$0.50"}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Instant EPUB Download
                  </span>
                </div>
              </div>

              {/* Add To Cart & Direct Checkout Buttons */}
              <AddToCartActions bookId={book.id} />

              {/* Collapsible Introduction Section */}
              <BookDescription description={book.description} />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

