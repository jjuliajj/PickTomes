"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  Scroll,
  ArrowRight
} from "lucide-react";

export default function CartPage() {
  const { cartItems, allBooks, updateQuantity, removeFromCart, cartTotal, isMounted } = useCart();

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[#F4EBD9] text-[#2B1E16] font-serif">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-bold text-[#8B0000] hover:text-[#2B1E16] transition-colors mb-2 uppercase tracking-widest gap-2 font-manrope">
                <ArrowLeft className="w-4 h-4" />
                Back to Tome Vaults
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-[#2B1E16] flex items-center gap-3">
                <Scroll className="w-8 h-8 text-[#8B0000]" />
                Scriptorium Tome Cart
              </h1>
            </div>
            <span className="text-xs font-bold text-[#8B0000] bg-[#E6D7BC] px-4 py-2 rounded-full border border-[#8B0000]/30 w-fit font-manrope">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Selected Tome' : 'Selected Tomes'}
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-[#E6D7BC] rounded-3xl p-12 text-center border-2 border-[#8B0000]/40 shadow-xl max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-[#8B0000] text-[#F4EBD9] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#B8860B]">
                <Scroll className="w-8 h-8 text-[#B8860B]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2B1E16] mb-2">Scriptorium Cart is Empty</h3>
              <p className="text-xs text-[#2B1E16]/80 mb-6 font-manrope">Explore ancient philosophy, classical literature, and rare digital EPUB tomes.</p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#8B0000] hover:bg-[#2B1E16] text-[#F4EBD9] px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all border border-[#B8860B] shadow-lg font-manrope"
              >
                <span>Unseal Scriptorium Vaults</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-[#E6D7BC] rounded-2xl p-4 border-2 border-[#8B0000]/30 shadow-md hover:border-[#8B0000] transition-all flex gap-4 items-center"
                  >
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[9/16] bg-[#2B1E16] rounded-xl overflow-hidden flex-shrink-0 border-2 border-[#B8860B]/40 block">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#B8860B] text-[9px]">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="font-bold text-base md:text-lg text-[#2B1E16] hover:text-[#8B0000] transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <span className="font-bold text-[#8B0000] text-sm whitespace-nowrap font-manrope">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '0.00'}`}
                        </span>
                      </div>

                      <p className="text-xs text-[#2B1E16]/70 italic">by {item.author}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 bg-[#F4EBD9] border border-[#8B0000]/30 rounded-full px-3 py-1 font-manrope">
                          <button className="text-[#2B1E16]/70 hover:text-[#8B0000]" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#2B1E16] w-4 text-center">{item.quantity}</span>
                          <button className="text-[#2B1E16]/70 hover:text-[#8B0000]" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button className="text-rose-700 hover:bg-rose-100 p-2 rounded-lg transition-all" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - High Contrast Sepia Ink Box */}
              <div className="lg:col-span-5">
                <div className="bg-[#2B1E16] text-[#F4EBD9] rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-[#B8860B] space-y-6 sticky top-28">
                  <div className="flex items-center justify-between border-b border-[#B8860B]/30 pb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                      <Scroll className="w-5 h-5 text-[#B8860B]" /> Scriptorium Order Summary
                    </h2>
                    <span className="text-xs font-bold text-[#B8860B] bg-[#B8860B]/20 px-3 py-1 rounded-full uppercase border border-[#B8860B]/30 font-manrope">ANCIENT EPUB</span>
                  </div>

                  <div className="space-y-3 text-xs text-white font-manrope">
                    <div className="flex justify-between text-white/90">
                      <span>Subtotal ({fullCartItems.length} items)</span>
                      <span className="font-bold text-white text-sm">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>Scriptorium Delivery</span>
                      <span className="text-emerald-400 font-bold uppercase text-[10px]">Instant Download Access</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>Codex Tax</span>
                      <span className="font-bold text-white">$0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-[#B8860B]/30">
                      <span className="text-base font-bold text-white">Total Amount</span>
                      <span className="text-3xl font-black text-[#B8860B]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-[#8B0000] hover:bg-[#B8860B] text-[#F4EBD9] hover:text-[#2B1E16] py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group font-manrope border border-[#B8860B]"
                  >
                    <span>Unseal & Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-[#B8860B]/20 flex items-center justify-center gap-2 text-[10px] text-[#F4EBD9]/80 uppercase text-center font-manrope">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Lifetime Access to Preserved Digital Codex</span>
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
