"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Check, Star, BookOpen } from "lucide-react";

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
    <div className="bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-[#C92127] shadow-xs hover:shadow-xl transition-all duration-300 font-sans flex flex-col justify-between h-full group relative overflow-hidden text-left">
      
      {/* Top Discount Tag floating pill */}
      <div className="flex items-center justify-between gap-1 mb-2.5">
        <span className="bg-[#C92127] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-2xs">
          -35% OFF
        </span>
        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase">
          {category || "FAHASA"}
        </span>
      </div>

      {/* Book Cover Frame */}
      <Link href={`/products/${id}`} className="block relative mb-3 group/cover overflow-hidden rounded-xl bg-slate-50 border border-slate-200/60 aspect-[3/4]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-400 bg-slate-50">
            <BookOpen className="w-8 h-8 mb-2 opacity-40" />
            <span className="text-xs font-bold italic line-clamp-2">{title}</span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex-grow flex flex-col justify-between space-y-3">
        <div>
          <Link href={`/products/${id}`}>
            <h3 className="font-bold text-sm text-slate-800 group-hover:text-[#C92127] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 italic mt-1 truncate">
            bởi {author}
          </p>

          {/* Rating & Sales Counter (Fahasa style) */}
          <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-500 font-semibold">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="ml-1 text-slate-800 font-bold">4.9</span>
            </div>
            <span>•</span>
            <span className="text-slate-500 text-[10px]">Đã bán 180+</span>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-slate-100 space-y-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-[#C92127] leading-none">
              {currentPriceFormatted}
            </span>
            <span className="text-xs text-slate-400 line-through font-semibold">
              {originalPriceFormatted}
            </span>
          </div>

          {/* Full-width Fahasa Red Action Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-xs flex items-center justify-center gap-1.5 border-2 ${
              added 
                ? "bg-emerald-600 border-emerald-600 text-white" 
                : "border-[#C92127] text-[#C92127] bg-white hover:bg-[#C92127] hover:text-white active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" /> Đã thêm vào giỏ
              </>
            ) : (
                <>
                <ShoppingCart className="w-3.5 h-3.5" /> Thêm vào giỏ hàng
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
