"use client";

import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import { ShoppingBag, Heart, Check } from "lucide-react";

export default function AddToCartActions({ bookId }: { bookId: string }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(bookId);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 pt-2">
      <button 
        onClick={handleAdd}
        className={`px-8 py-3.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center justify-center space-x-2.5 flex-1 ${
          added 
            ? "bg-emerald-500 text-slate-950" 
            : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 active:scale-95"
        }`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span>Added to Cart</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4 text-slate-950 stroke-[2.5]" />
            <span>Add to Vault Cart</span>
          </>
        )}
      </button>
      
      <button className="border border-slate-800 bg-slate-950 px-6 py-3.5 rounded-full font-bold text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2">
        <Heart className="w-4 h-4 text-amber-400" />
        <span>Wishlist</span>
      </button>
    </div>
  );
}
