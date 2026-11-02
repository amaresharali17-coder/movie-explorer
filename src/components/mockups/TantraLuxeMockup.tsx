import React, { useState } from 'react';
import { ShoppingBag, Filter, Check, Star, Sparkles, Server } from 'lucide-react';

export const TantraLuxeMockup: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cartCount, setCartCount] = useState<number>(2);
  const [addedItem, setAddedItem] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: 'Structured Obsidian Trench',
      category: 'Outerwear',
      price: '₹14,999',
      color: '#1a1a1a',
      badge: 'Bestseller',
      sizes: ['S', 'M', 'L'],
    },
    {
      id: 2,
      name: 'Beige Cashmere Overcoat',
      category: 'Tailored',
      price: '₹18,500',
      color: '#D4C3A3',
      badge: 'New Season',
      sizes: ['M', 'L', 'XL'],
    },
    {
      id: 3,
      name: 'Silk Charmeuse Evening Blazer',
      category: 'Tailored',
      price: '₹12,499',
      color: '#0f172a',
      badge: 'Limited Run',
      sizes: ['XS', 'S', 'M'],
    },
    {
      id: 4,
      name: 'Ribbed Merino Wool Turtleneck',
      category: 'Knitwear',
      price: '₹6,999',
      color: '#e2d9cc',
      badge: 'Essential',
      sizes: ['S', 'M', 'L', 'XL'],
    },
  ];

  const handleAddToCart = (id: number) => {
    setAddedItem(id);
    setCartCount((prev) => prev + 1);
    setTimeout(() => setAddedItem(null), 1500);
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full bg-[#121214] rounded-xl overflow-hidden border border-white/10 shadow-2xl font-sans">
      {/* Browser Chrome Header */}
      <div className="bg-[#18181C] px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]" />
          <span className="ml-2 font-mono text-[11px] text-[#929BA5] hidden sm:inline">
            Apache Tomcat 10.1 • Jakarta Servlets • MySQL 8.0
          </span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/40 border border-white/[0.06] text-[#D7E2EA] font-mono text-[11px] max-w-[260px] truncate">
          <span className="text-emerald-400">https://</span>
          <span>localhost:8080/tantra-luxe/shop</span>
        </div>
        <div className="flex items-center gap-2 text-[#929BA5]">
          <span className="hidden md:inline text-[10px] uppercase tracking-wider text-purple-400 font-semibold">
            Java 21 MVC
          </span>
        </div>
      </div>

      {/* Mock Storefront Interface: Black & Beige Luxury Aesthetic */}
      <div className="p-4 sm:p-6 bg-[#0E0E10] text-[#E8DFD8]">
        {/* Top Navbar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2E]">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-serif tracking-[0.25em] font-bold text-[#F3ECE5] uppercase">
              TANTRA LUXE
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#C4A482]/20 text-[#D4C3A3] border border-[#C4A482]/30">
              Couture
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline font-mono text-[#A89F91]">
              MVC Catalog Engine
            </span>
            <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#242428] border border-[#3E3E44] text-[#F3ECE5]">
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4C3A3]" />
              <span className="font-mono text-xs">{cartCount}</span>
            </div>
          </div>
        </div>

        {/* Hero Editorial Strip */}
        <div className="my-5 p-5 rounded-lg bg-gradient-to-r from-[#1C1A17] via-[#231F1A] to-[#171513] border border-[#3A332A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] tracking-widest font-mono text-[#D4C3A3] uppercase">
              Autonomous Inventory Matrix
            </div>
            <h4 className="text-base sm:text-lg font-serif tracking-wide text-[#FAF7F2] font-semibold">
              The Winter Monolith Collection
            </h4>
            <p className="text-xs text-[#A89F91] mt-1 max-w-md">
              Synchronized with an 8-table relational MySQL schema. Dynamic pricing &amp; variant matrix.
            </p>
          </div>
          <div className="px-3 py-1.5 rounded bg-[#D4C3A3] text-black font-semibold text-xs tracking-wider uppercase">
            JSP Dynamic View
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between gap-2 mb-4 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#D4C3A3] mr-1 shrink-0" />
            {['All', 'Outerwear', 'Tailored', 'Knitwear'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#D4C3A3] text-black font-bold'
                    : 'bg-[#1C1C20] text-[#A89F91] hover:text-[#FAF7F2]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-[11px] font-mono text-[#827A6D] hidden md:inline">
            Active Servlet Session: EST-942
          </span>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-[#17171B] rounded-lg p-3 border border-[#2B2B32] flex flex-col justify-between group hover:border-[#D4C3A3]/50 transition-all"
            >
              <div>
                <div className="h-28 rounded-md bg-[#222228] flex items-center justify-center relative overflow-hidden mb-2.5">
                  <div
                    className="w-16 h-16 rounded-full shadow-inner opacity-75 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/60 text-[#D4C3A3]">
                    {p.badge}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#D4C3A3] uppercase">{p.category}</div>
                <h5 className="text-xs font-semibold text-[#F3ECE5] truncate">{p.name}</h5>

                <div className="flex items-center gap-1 mt-1.5">
                  {p.sizes.map((s) => (
                    <span
                      key={s}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/30 border border-white/5 text-[#A89F91]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#2B2B32] flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-[#FAF7F2]">{p.price}</span>
                <button
                  onClick={() => handleAddToCart(p.id)}
                  className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${
                    addedItem === p.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#D4C3A3] text-black hover:bg-[#FAF7F2]'
                  }`}
                >
                  {addedItem === p.id ? 'Added!' : '+ Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
