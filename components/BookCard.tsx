"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Check, Star, BookOpen, Sparkles } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image?: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image, description }: BookCardProps) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const rawNum = parseFloat(price ? price.replace(/[^0-9.]/g, "") : "1.99") || 1.99;
  const currentPriceFormatted = price ? (price.startsWith("$") ? price : `$${price}`) : "$1.99";
  const originalPriceFormatted = `$${(rawNum * 1.5).toFixed(2)}`;

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-amber-500/60 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 font-sans flex flex-col justify-between h-full group relative overflow-hidden text-left">
      
      {/* Top Floating Badge */}
      <div className="flex items-center justify-between gap-1 mb-2.5 z-10">
        <span className="bg-rose-50 text-rose-800 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-rose-200 shadow-2xs">
          35% OFF
        </span>
        <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md uppercase border border-amber-200">
          {category || "DIGITAL"}
        </span>
      </div>

      {/* Book Cover Container */}
      <Link href={`/products/${id}`} className="block relative mb-3 group/cover overflow-hidden rounded-xl bg-slate-100 border border-slate-200 aspect-[3/4] shadow-inner">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-400 bg-slate-100">
            <BookOpen className="w-8 h-8 mb-2 opacity-40 text-[#0F172A]" />
            <span className="text-xs font-bold italic line-clamp-2 text-slate-600 font-cormorant">{title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-end p-3">
          <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Read Excerpt
          </span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="flex-grow flex flex-col justify-between space-y-3">
        <div>
          <Link href={`/products/${id}`}>
            <h3 className="font-bold text-lg text-[#0F172A] group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug min-h-[2.75rem] font-cormorant">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 italic mt-1 truncate">
            by <span className="text-slate-800 not-italic font-semibold">{author}</span>
          </p>

          {/* Rating & Sales Counter */}
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-600 font-semibold">
            <div className="flex items-center text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="ml-1 text-slate-900 font-extrabold">4.9</span>
            </div>
            <span>•</span>
            <span className="text-slate-500 text-[10px]">180+ EPUB Downloads</span>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="pt-2.5 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-[#0F172A] leading-none">
              {currentPriceFormatted}
            </span>
            <span className="text-xs text-slate-400 line-through font-semibold">
              {originalPriceFormatted}
            </span>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 border ${
              added 
                ? "bg-emerald-600 border-emerald-600 text-white" 
                : "bg-[#0F172A] hover:bg-amber-600 border-[#0F172A] text-white active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 text-amber-300" /> Add to Cart
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}


