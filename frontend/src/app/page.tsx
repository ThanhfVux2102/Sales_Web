"use client";
import { useState } from "react";
import { sendOrder } from "@/lib/api";


export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Announcement / marquee (giả lập, không auto-scroll để đơn giản) */}
      <div className="w-full bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-2 text-center text-xs md:text-sm">
          Mua sắm & Tận hưởng miễn phí giao hàng trong 2h cùng với Hella Beauty ✨
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          <a className="font-semibold tracking-wide text-lg md:text-xl" href="#">
            hella<span className="text-pink-600">beauty</span>
          </a>

          {/* Search (desktop) */}
          <div className="hidden md:block flex-1 max-w-xl">
            <label className="relative block">
              <input
                placeholder="Tìm sản phẩm, thương hiệu..."
                className="w-full h-10 pl-10 pr-4 rounded-full border outline-none text-sm focus:ring-2 focus:ring-pink-500/40"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/>
              </svg>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="hidden md:inline-flex text-sm px-3 h-9 rounded-full border hover:bg-gray-50">Đăng nhập</button>
            <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Wishlist">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.238.98-4 2.4-.762-1.42-2.26-2.4-4-2.4C6.015 3.75 4 5.765 4 8.25c0 7.125 8.5 11 8.5 11s8.5-3.875 8.5-11z"/>
              </svg>
            </button>
            <button className="relative p-2 rounded-full hover:bg-gray-100" aria-label="Cart">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
              <span className="absolute -top-1 -right-1 text-[10px] bg-pink-600 text-white w-4 h-4 flex items-center justify-center rounded-full">0</span>
            </button>
          </div>
        </div>

        {/* Primary nav (không bullet/underline) */}
        <nav className="border-t">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <ul className="flex gap-4 overflow-x-auto text-sm h-11 items-center">
              {[
                "Trang chủ","Sản phẩm mới","Bán chạy","Chăm sóc da",
                "Trang điểm","Chăm sóc tóc","Body care","Thương hiệu","Khuyến mãi"
              ].map(x => (
                <li key={x}>
                  <a className="inline-block py-2 px-2 text-gray-700 hover:text-pink-600 whitespace-nowrap" href="#">{x}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Hero: cố định tỉ lệ + overlay, text không chồng xấu */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-6">
        <div className="relative overflow-hidden rounded-2xl shadow-sm">
          <div className="aspect-[16/6] md:aspect-[16/5]">
            <img src="/images/hero-banner.jpg" alt="Hero" className="w-full h-full object-cover"/>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"/>
          <div className="absolute left-6 bottom-6 text-white max-w-xl drop-shadow">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">Sắc đẹp tối giản • Rực rỡ tự nhiên</h2>
            <p className="mt-2 text-sm md:text-base/6 opacity-95">Bộ sưu tập làm sạch & dưỡng ẩm – chọn ngay sản phẩm phù hợp làn da bạn.</p>
            <div className="mt-4 flex gap-3">
              <a href="#new" className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">Sản phẩm mới</a>
              <a href="#best" className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">Bán chạy</a>
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "Làm sạch", img: "/images/cat-cleanser.jpg" },
            { title: "Dưỡng ẩm", img: "/images/cat-moist.jpg" },
            { title: "Chống nắng", img: "/images/cat-sunscreen.jpg" },
            { title: "Trang điểm", img: "/images/cat-makeup.jpg" },
          ].map(c => (
            <a key={c.title} href="#" className="group relative rounded-2xl overflow-hidden">
              <div className="aspect-[4/3]">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
              </div>
              <div className="absolute inset-0 bg-black/15"/>
              <span className="absolute bottom-3 left-3 text-white font-semibold">{c.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Section: Sản phẩm mới */}
      <Section title="Chương trình HOT dành riêng cho tín đồ Hella Beauty" id="new">
        <ProductGrid prefix="new"/>
      </Section>



      {/* Section: Bán chạy */}
      <Section title="Bán chạy">
        <ProductGrid prefix="best"/>
      </Section>


      {/* Footer */}
      <footer className="mt-14 border-t">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="font-bold text-lg">hella<span className="text-pink-600">beauty</span></div>
            <p className="mt-3 text-gray-600">Cửa hàng mỹ phẩm chính hãng • Đẹp hơn mỗi ngày.</p>
          </div>
          <FooterCol title="Về Hella Beauty" items={["Câu chuyện thương hiệu","Giới thiệu","Tuyển dụng","Liên hệ"]}/>
          <FooterCol title="Hỗ trợ khách hàng" items={["Hướng dẫn đặt hàng","Vận chuyển","Thanh toán","Đổi trả"]}/>
          <div>
            <h5 className="font-semibold mb-3">Kết nối</h5>
            <p className="text-gray-600">Facebook • Instagram • TikTok</p>
          </div>
        </div>
        <div className="py-4 text-xs text-center text-gray-500 border-t">
          © {new Date().getFullYear()} Hella Beauty. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
      <div className="flex items-end justify-between mb-4">
        <h3 className="text-xl md:text-2xl font-bold">{title}</h3>
        <a href="#" className="text-sm hover:text-pink-600">Xem tất cả →</a>
      </div>
      {children}
    </section>
  );
}

function ProductGrid({ prefix }: { prefix: string }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // DÙNG ảnh trong /public/images, KHÔNG ghép prefix vào đường dẫn ảnh
  const items = [
    { id: "p1", name: "Serum", price: "299k", image: `/images/prod-1.jpg` },
    { id: "p2", name: "Kem dưỡng", price: "350k", image: `/images/prod-2.jpg` },
    { id: "p3", name: "Sữa rửa mặt", price: "199k", image: `/images/prod-3.jpg` },
    { id: "p4", name: "Tẩy trang", price: "259k", image: `/images/prod-4.jpg` },
  ];

  async function handleQuickOrder(p: { id: string; name: string }) {
    setLoadingId(p.id);
    const ok = await sendOrder({
      email: "customer@example.com", // tạm test cứng
      name: "Demo User",
      note: `Quick order for ${p.name}`,
      items: [{ id: p.id, qty: 1 }],
    });
    setLoadingId(null);
    alert(ok ? "✅ Đặt hàng thành công" : "❌ Gửi đơn thất bại");
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {items.map((p) => (
        <div
          key={p.id}
          className="group border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
        >
          <img src={p.image} alt={p.name} className="w-full object-cover" />
          <div className="p-3">
            <p className="font-medium">{p.name}</p>
            <p className="text-pink-600 font-semibold">{p.price}</p>
            <button
              onClick={() => handleQuickOrder(p)}
              disabled={loadingId === p.id}
              className="mt-3 w-full border border-pink-500 text-pink-600 rounded-full py-2 hover:bg-pink-50 disabled:opacity-50"
            >
              {loadingId === p.id ? "Đang gửi..." : "Đặt hàng"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}


function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h5 className="font-semibold mb-3">{title}</h5>
      <ul className="space-y-2 text-gray-600">
        {items.map((x) => (
          <li key={x}><a href="#" className="hover:text-pink-600">{x}</a></li>
        ))}
      </ul>
    </div>
  );
}
