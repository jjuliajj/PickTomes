"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Plus, Layers, Sparkles } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image, description }: BookCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
  };

  return (
    <Link href={`/products/${id}`} className="group cursor-pointer block min-w-[260px] max-w-[280px] flex-shrink-0 snap-start">
      <div className="bg-white border border-[#334155]/20 rounded-3xl p-5 shadow-lg hover:shadow-2xl hover:border-[#334155] transition-all duration-500 font-manrope space-y-4 text-left group-hover:-translate-y-2">
        
        {/* Spatial Floating Cover Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#334155] rounded-2xl border border-[#334155]/10 shadow-md">
          {image ? (
            <img src={image} alt={title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#F8FAFC] font-serif text-xs px-3 text-center">
              {title}
            </div>
          )}

          <div className="absolute top-3 left-3">
            <span className="bg-[#F8FAFC]/95 backdrop-blur-md text-[#334155] px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-full shadow-xs">
              {category || "SPATIAL"}
            </span>
          </div>

          <div className="absolute inset-0 bg-[#334155]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
            <button 
              onClick={handleQuickAdd}
              className="bg-[#F8FAFC] text-[#334155] px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#334155] hover:text-white flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Add to Gallery
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5">
          <h3 className="font-serif font-bold text-base text-[#334155] group-hover:text-[#1E293B] transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-[#334155]/70 italic">by {author}</p>
          
          <div className="pt-2 border-t border-[#334155]/15 flex items-center justify-between">
            <span className="text-xs font-bold text-[#334155]">{price}</span>
            <span className="text-[9px] uppercase font-bold text-[#334155]/60 flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#334155]" /> Spatial
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
