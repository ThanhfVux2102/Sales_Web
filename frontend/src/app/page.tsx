// Drop this file into your Next.js App Router project as src/app/page.tsx
// It's a static, no-logic mock inspired by hellabeauty.vn layout/positions.
// Uses Tailwind utility classes (no external deps). Replace placeholder images and text as needed.

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Announcement Bar */}
      <div className="w-full bg-black text-white text-xs md:text-sm text-center py-2">
        <p>FREESHIP đơn từ 299K • Ưu đãi tuần lễ làm đẹp ✨</p>
      </div>

      {/* Header: Logo + Search + Actions */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <a href="#" className="font-bold text-lg tracking-wide">hella<span className="text-pink-500">beauty</span></a>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <input
                  className="w-full border rounded-full h-10 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-pink-500/40"
                  placeholder="Tìm sản phẩm, thương hiệu..."
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="hidden md:inline-flex text-sm px-3 py-2 rounded-full border hover:bg-gray-50">Đăng nhập</button>
              <button aria-label="Wishlist" className="p-2 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M21 8.25c0-2.485-2.015-4.5-4.5-4.5-1.74 0-3.238.98-4 2.4-.762-1.42-2.26-2.4-4-2.4C6.015 3.75 4 5.765 4 8.25c0 7.125 8.5 11 8.5 11s8.5-3.875 8.5-11z"/></svg>
              </button>
              <button aria-label="Cart" className="relative p-2 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
                <span className="absolute -top-1 -right-1 text-[10px] bg-pink-500 text-white w-4 h-4 flex items-center justify-center rounded-full">0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Primary Nav */}
        <nav className="border-t">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <ul className="flex gap-4 overflow-x-auto no-scrollbar text-sm h-12 items-center">
              {[
                "Trang chủ","Sản phẩm mới","Bán chạy","Chăm sóc da","Trang điểm","Chăm sóc tóc","Body care","Thương hiệu","Khuyến mãi"
              ].map((x) => (
                <li key={x}>
                  <a href="#" className="inline-block py-2.5 px-2 hover:text-pink-600 whitespace-nowrap">{x}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Hero Banner */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-6">
        <div className="relative rounded-2xl overflow-hidden shadow-sm">
          <img src="/images/hero-banner.jpg" alt="Hero" className="w-full h-[280px] md:h-[420px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute left-6 bottom-6 text-white max-w-lg">
            <h2 className="text-2xl md:text-4xl font-bold leading-tight">Sắc đẹp tối giản • Rực rỡ tự nhiên</h2>
            <p className="mt-2 text-sm md:text-base opacity-90">Bộ sưu tập làm sạch & dưỡng ẩm mùa này – chọn ngay sản phẩm phù hợp làn da bạn.</p>
            <div className="mt-4 flex gap-3">
              <a href="#new" className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">Sản phẩm mới</a>
              <a href="#best" className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">Bán chạy</a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {title: "Làm sạch", img: "/images/cat-cleanser.jpg"},
            {title: "Dưỡng ẩm", img: "/images/cat-moist.jpg"},
            {title: "Chống nắng", img: "/images/cat-sunscreen.jpg"},
            {title: "Trang điểm", img: "/images/cat-makeup.jpg"},
          ].map((c) => (
            <a key={c.title} href="#" className="group relative rounded-2xl overflow-hidden">
              <img src={c.img} alt={c.title} className="w-full h-32 md:h-44 object-cover transition-transform duration-500 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-black/20"/>
              <span className="absolute bottom-3 left-3 text-white font-semibold">{c.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section id="new" className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <div className="flex items-end justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-bold">Sản phẩm mới</h3>
          <a href="#" className="text-sm hover:text-pink-600">Xem tất cả →</a>
        </div>
        <ProductGrid prefix="new"/>
      </section>

      {/* Wide Promo Banner */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <div className="relative rounded-2xl overflow-hidden">
          <img src="/images/promo.jpg" alt="Ưu đãi" className="w-full h-40 md:h-56 object-cover"/>
          <div className="absolute inset-0 bg-pink-600/10" />
          <div className="absolute left-6 top-1/2 -translate-y-1/2">
            <h4 className="text-2xl md:text-3xl font-bold">Combo dưỡng ẩm -15%</h4>
            <p className="text-sm opacity-80 mt-1">Da căng mướt cả ngày • Số lượng có hạn</p>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section id="best" className="max-w-6xl mx-auto px-4 md:px-6 mt-12">
        <div className="flex items-end justify-between mb-4">
          <h3 className="text-xl md:text-2xl font-bold">Bán chạy</h3>
          <a href="#" className="text-sm hover:text-pink-600">Xem tất cả →</a>
        </div>
        <ProductGrid prefix="best"/>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-14">
        <div className="rounded-2xl border p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h4 className="text-xl md:text-2xl font-bold">Nhận tin ưu đãi mỗi tuần</h4>
            <p className="text-sm mt-1 text-gray-600">Mẹo skincare & deal riêng cho bạn – không spam.</p>
          </div>
          <form className="flex gap-3">
            <input className="flex-1 border rounded-full h-11 px-4 text-sm outline-none focus:ring-2 focus:ring-pink-500/40" placeholder="Nhập email của bạn"/>
            <button className="h-11 px-5 rounded-full bg-pink-600 text-white text-sm font-medium">Đăng ký</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-14 border-t">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="font-bold text-lg">hella<span className="text-pink-500">beauty</span></div>
            <p className="mt-3 text-gray-600">Cửa hàng mỹ phẩm chính hãng • Đẹp hơn mỗi ngày.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Danh mục</h5>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#">Chăm sóc da</a></li>
              <li><a href="#">Trang điểm</a></li>
              <li><a href="#">Chăm sóc tóc</a></li>
              <li><a href="#">Body care</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Hỗ trợ</h5>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#">Liên hệ</a></li>
              <li><a href="#">Chính sách đổi trả</a></li>
              <li><a href="#">Giao hàng & Freeship</a></li>
              <li><a href="#">Bảo mật</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Kết nối</h5>
            <p className="text-gray-600">Facebook • Instagram • TikTok</p>
          </div>
        </div>
        <div className="py-4 text-xs text-center text-gray-500 border-t">© {new Date().getFullYear()} Hella Beauty. All rights reserved.</div>
      </footer>
    </div>
  );
}

function ProductGrid({ prefix }: { prefix: string }) {
  // Static mock products (replace images + info later)
  const items = Array.from({ length: 8 }).map((_, i) => ({
    id: `${prefix}-${i + 1}`,
    name: `Sản phẩm ${i + 1}`,
    price: 99000 + i * 10000,
    img: `/images/prod-${(i % 4) + 1}.jpg`,
    badge: i % 3 === 0 ? "NEW" : i % 5 === 0 ? "-15%" : null,
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((p) => (
        <a key={p.id} href="#" className="group border rounded-2xl overflow-hidden hover:shadow-sm transition">
          <div className="relative">
            <img src={p.img} alt={p.name} className="w-full h-44 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"/>
            {p.badge && (
              <span className="absolute left-2 top-2 text-xs bg-white/90 backdrop-blur px-2 py-0.5 rounded-full">{p.badge}</span>
            )}
          </div>
          <div className="p-3">
            <h4 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">{p.name}</h4>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-semibold">{(p.price / 1000).toFixed(0)}k</span>
              {p.badge?.includes("-") && (
                <span className="text-xs text-gray-500 line-through">{((p.price*100)/85/1000).toFixed(0)}k</span>
              )}
            </div>
            <button className="mt-3 w-full text-sm border rounded-full py-2 hover:bg-gray-50">Thêm vào giỏ</button>
          </div>
        </a>
      ))}
    </div>
  );
}
