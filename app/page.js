import Link from "next/link";
import BookCard from "@/components/BookCard";
import books from "@/lib/books";
import { BookOpen, Search, Star, Users, ArrowRight, Zap } from "lucide-react";

const featuredBooks = books.slice(0, 4);
const marqueeText = books.map(b => b.title).join(" | New Arrival: ");

export default function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden py-24" style={{ background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: "rgba(245,158,11,0.06)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px]" style={{ background: "rgba(59,130,246,0.06)" }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
            <Zap size={14} /> Digital Library Platform
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-none tracking-tight">
            Find Your <span className="gradient-text">Next Read</span>
          </h1>
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore thousands of books across every genre. Borrow, read, and discover new worlds — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/all-books" className="btn-primary text-base px-8 py-4">
              <Search size={18} /> Browse Now
            </Link>
            <Link href="/register" className="btn-outline text-base px-8 py-4">
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            {[
              { label: "Books Available", value: "12+" },
              { label: "Categories", value: "3" },
              { label: "Happy Readers", value: "100+" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black gradient-text">{s.value}</p>
                <p className="text-gray-500 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-3 overflow-hidden" style={{ background: "#f59e0b" }}>
        <div className="marquee-track">
          <span className="text-black font-semibold text-sm px-4">
            📚 New Arrivals: {marqueeText} | 🎉 Special Discount on Memberships | 📖 {marqueeText} |
          </span>
          <span className="text-black font-semibold text-sm px-4">
            📚 New Arrivals: {marqueeText} | 🎉 Special Discount on Memberships | 📖 {marqueeText} |
          </span>
        </div>
      </div>

      {/* Featured Books */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">Handpicked for You</p>
            <h2 className="text-4xl font-black text-white">Featured <span className="gradient-text">Books</span></h2>
          </div>
          <Link href="/all-books" className="btn-outline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Why BookBorrow */}
      <section className="py-20" style={{ background: "#161b22" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">Why Choose Us</p>
            <h2 className="text-4xl font-black text-white">Why <span className="gradient-text">BookBorrow?</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "📚", title: "Vast Collection", desc: "Access hundreds of books across multiple categories including Story, Tech, and Science." },
              { icon: "⚡", title: "Instant Borrow", desc: "Borrow any available book instantly with a single click. No paperwork, no waiting." },
              { icon: "🔒", title: "Secure Platform", desc: "Your data is protected with industry-standard security. Sign in with Google safely." },
            ].map((f) => (
              <div key={f.title} className="book-card p-6 text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">Browse By Genre</p>
          <h2 className="text-4xl font-black text-white">Book <span className="gradient-text">Categories</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Story", emoji: "📖", count: books.filter(b => b.category === "Story").length, color: "#3b82f6" },
            { name: "Tech", emoji: "💻", count: books.filter(b => b.category === "Tech").length, color: "#22c55e" },
            { name: "Science", emoji: "🔬", count: books.filter(b => b.category === "Science").length, color: "#a855f7" },
          ].map((cat) => (
            <Link key={cat.name} href={`/all-books?category=${cat.name}`}
              className="book-card p-8 text-center group cursor-pointer block">
              <div className="text-5xl mb-4">{cat.emoji}</div>
              <h3 className="font-bold text-white text-xl mb-2">{cat.name}</h3>
              <p className="text-sm mb-4" style={{ color: cat.color }}>{cat.count} Books Available</p>
              <span className="btn-outline text-sm py-2 px-4 group-hover:border-amber-400 group-hover:text-amber-400">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
