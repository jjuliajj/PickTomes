"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  BookOpen,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function CartPage() {
  const { cartItems, allBooks, updateQuantity, removeFromCart, cartTotal, isMounted } = useCart();

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[#FBF9F5] text-slate-900 font-sans">
      <Navbar />
      
      <section className="pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-bold text-amber-900 hover:text-amber-700 transition-colors mb-2 uppercase tracking-wider gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to PickTomes Catalog
              </Link>
              <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] font-cormorant flex items-center gap-3">
                <ShoppingCart className="w-8 h-8 text-amber-700" />
                Vault Cart & Order Summary
              </h1>
            </div>
            <span className="text-xs font-extrabold text-amber-900 bg-amber-100 px-4 py-2 border border-amber-200 rounded-full w-fit uppercase shadow-2xs">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Volume' : 'Volumes'}
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-md max-w-lg mx-auto my-8 space-y-4">
              <div className="w-16 h-16 bg-amber-50 text-amber-700 rounded-2xl flex items-center justify-center mx-auto border border-amber-200">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] font-cormorant">Your Vault Cart is Currently Empty</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Explore our digital literature catalog and add your favorite titles for instant EPUB delivery!
              </p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-amber-700 text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <span>Browse Full Catalog</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Items List */}
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:border-amber-500/60 transition-all flex gap-4 items-center"
                  >
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 block">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-[9px] font-bold p-2 text-center">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="font-bold text-base md:text-lg text-[#0F172A] font-cormorant hover:text-amber-700 transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <span className="font-black text-[#0F172A] text-base whitespace-nowrap">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '1.99'}`}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 italic">by {item.author}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1">
                          <button className="text-slate-600 hover:text-amber-700" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                          <button className="text-slate-600 hover:text-amber-700" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button className="text-rose-600 hover:bg-rose-50 p-2 rounded-full transition-all" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/90 space-y-6 sticky top-28">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-black text-[#0F172A] font-cormorant flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-700" /> Order Overview
                    </h2>
                    <span className="text-[10px] font-extrabold text-[#0F172A] bg-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-200">SECURE VAULT</span>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600 font-medium">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Subtotal ({fullCartItems.length} items)</span>
                      <span className="font-bold text-[#0F172A] text-sm">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">EPUB Digital Delivery</span>
                      <span className="text-emerald-700 font-extrabold uppercase text-[10px]">Complimentary</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-slate-100">
                      <span className="text-base font-bold text-[#0F172A]">Total Due</span>
                      <span className="text-3xl font-black text-[#0F172A]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-[#0F172A] hover:bg-amber-700 text-white py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4 text-amber-300 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider text-center font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>256-Bit SSL Encrypted Checkout</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

