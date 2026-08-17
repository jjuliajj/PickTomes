import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { BookOpen, ShieldCheck, Award, Flame, ArrowRight, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới Thiệu Hệ Thống Nhà Sách | Fahasa PickTomes Hub",
  description: "Tìm hiểu về sứ mệnh cung cấp tri thức và các sản phẩm sách bản quyền chất lượng hàng đầu.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F0F2F5] font-sans">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-5xl space-y-16">
          
          <header className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#C92127] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200">
              <Flame className="w-4 h-4 fill-[#C92127]" /> NHÀ SÁCH HÀNG ĐẦU VIỆT NAM
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-800">
              Về Fahasa PickTomes Hub
            </h1>
            <p className="text-base text-slate-600 font-semibold leading-relaxed">
              Fahasa PickTomes Hub là hệ thống phân phối sách trực tuyến hàng đầu, mang đến các đầu sách văn học, kinh tế, triết học và kỹ năng sống chất lượng cao.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#C92127] text-white flex items-center justify-center font-black">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Sách Chính Hãng 100%</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Tất cả các đầu sách trên hệ thống đều có bản quyền đầy đủ và kiểm duyệt nội dung kỹ lưỡng.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#C92127] text-white flex items-center justify-center font-black">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Tải EPUB Tức Thời</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Đọc sách mọi lúc mọi nơi trên các thiết bị e-reader với định dạng chuẩn EPUB 3.0.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#C92127] text-white flex items-center justify-center font-black">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Ưu Đãi Mỗi Ngày</h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Chương trình Flash Sale độc quyền giảm giá đến 50% cùng nhiều phần quà tri thức hấp dẫn.
              </p>
            </div>
          </div>

          <div className="bg-[#C92127] text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-left">
              <h2 className="text-3xl font-black text-white">Khám Phá Kho Sách Ngay</h2>
              <p className="text-xs text-white/90 font-medium leading-relaxed">
                Duyệt qua hơn 40+ tác phẩm phong phú và đặt hàng nhanh chóng trên Fahasa PickTomes.
              </p>
            </div>
            <Link
              href="/collections"
              className="bg-white hover:bg-amber-300 text-[#C92127] hover:text-[#C92127] px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 flex-shrink-0"
            >
              <span>Vào Kho Sách</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
