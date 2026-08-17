import Link from "next/link";
import { Flame, ArrowRight, ShieldCheck, Tag, Gift, Zap, Percent, Sparkles, BookOpen } from "lucide-react";

export default function Hero() {
  const flashSaleBanners = [
    { title: "Sách Văn Học Giảm Đến 50%", code: "FAHASA50", bg: "from-rose-600 to-[#C92127]" },
    { title: "Sách Kinh Tế - Kỹ Năng Mới", code: "SKILL30", bg: "from-amber-600 to-rose-600" },
    { title: "Tủ Sách Triết Học Monograph", code: "THINK25", bg: "from-red-700 to-amber-700" }
  ];

  return (
    <section className="pt-36 pb-12 bg-[#F0F2F5] font-sans">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-8">
        
        {/* Main Fahasa Mega Flash Sale Banner Grid */}
        <div className="bg-[#C92127] text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl grid lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          
          {/* Subtle Background Badges Overlay */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/20 text-white text-xs font-bold rounded-full border border-white/30 uppercase tracking-widest backdrop-blur-xs">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300" /> SIÊU MUA SẮM FAHASA BOOKSTORE
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight uppercase tracking-tight">
              HỘI SÁCH ONLINE <br />
              <span className="text-amber-300">ƯU ĐÃI LÊN ĐẾN 50%</span>
            </h1>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-xl font-medium">
              Khám phá hàng ngàn đầu sách văn học, kinh tế, triết học và kỹ năng sống chính hãng. Nhận ngay mã giảm giá và tải về phiên bản EPUB Digital nhanh chóng.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/collections" 
                className="bg-white hover:bg-amber-300 text-[#C92127] hover:text-[#C92127] px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center gap-2 group"
              >
                <span>Xem Ngay Tủ Sách Fahasa</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link 
                href="/genres" 
                className="bg-black/30 hover:bg-black/50 text-white px-6 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-white/30 flex items-center gap-2"
              >
                <Tag className="w-4 h-4 text-amber-300" />
                <span>Khám Phá Thể Loại</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs text-white/90 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-300" /> Sách Bản Quyền 100%
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-300" /> Tải EPUB Tức Thời
              </span>
            </div>
          </div>

          {/* Right Flash Sale Banner Widget */}
          <div className="lg:col-span-5 bg-white text-slate-800 p-6 rounded-2xl border border-white/20 shadow-2xl space-y-4 relative z-10">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-black text-[#C92127] uppercase">
                <Gift className="w-5 h-5 text-[#C92127]" /> MÃ GIẢM GIÁ ĐẶC BIỆT
              </div>
              <span className="text-[10px] font-bold text-[#C92127] bg-rose-50 px-2 py-0.5 rounded border border-rose-200 uppercase">HÔM NAY</span>
            </div>

            <div className="space-y-3">
              {flashSaleBanners.map((banner, idx) => (
                <div key={idx} className={`bg-gradient-to-r ${banner.bg} text-white p-3.5 rounded-xl flex items-center justify-between shadow-xs`}>
                  <div>
                    <div className="text-xs font-black uppercase">{banner.title}</div>
                    <div className="text-[10px] text-white/80 font-bold mt-0.5">Nhập mã: <span className="bg-black/30 px-1.5 py-0.5 rounded text-amber-300">{banner.code}</span></div>
                  </div>
                  <Percent className="w-6 h-6 text-amber-300 opacity-80" />
                </div>
              ))}
            </div>

            <div className="pt-2 text-center text-xs text-slate-500 font-bold">
              ⚡ Số lượng mã có hạn - Áp dụng tự động tại giỏ hàng!
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
