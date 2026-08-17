import Link from "next/link";
import { BookOpen, ShieldCheck, Heart, PhoneCall, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t-4 border-[#C92127] font-sans">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#C92127] text-white p-2 flex items-center justify-center shadow-md">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white uppercase">
                PickTomes <span className="text-[#C92127] text-sm font-bold block sm:inline">| FAHASA HUB</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Hệ thống cung cấp sách số EPUB Digital chất lượng cao. Đảm bảo bản quyền 100%, tải về tức thì và tương thích với mọi thiết bị đọc sách trực tuyến.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-slate-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Cam Kết Sách Chính Hãng 100%
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#C92127] uppercase tracking-widest mb-4">DANH MỤC KHÁM PHÁ</h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-semibold">
              <li><Link href="/collections" className="hover:text-[#C92127] transition-colors">Tủ Sách Nổi Bật</Link></li>
              <li><Link href="/genres" className="hover:text-[#C92127] transition-colors">Thể Loại Sách</Link></li>
              <li><Link href="/authors" className="hover:text-[#C92127] transition-colors">Tác Giả & Học Giả</Link></li>
              <li><Link href="/about" className="hover:text-[#C92127] transition-colors">Về Fahasa PickTomes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#C92127] uppercase tracking-widest mb-4">HỖ TRỢ KHÁCH HÀNG</h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-semibold">
              <li><Link href="/cart" className="hover:text-[#C92127] transition-colors">Giỏ Hàng Của Bạn</Link></li>
              <li><Link href="/privacy" className="hover:text-[#C92127] transition-colors">Chính Sách Bảo Mật</Link></li>
              <li><Link href="/terms" className="hover:text-[#C92127] transition-colors">Điều Khoản Sử Dụng</Link></li>
              <li><Link href="/contact" className="hover:text-[#C92127] transition-colors">Trung Tâm Hỗ Trợ</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} PickTomes Fahasa Hub. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <span>Thiết kế e-commerce tối ưu hóa người dùng</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
