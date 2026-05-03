"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "@/components/BookCard";
import books from "@/lib/books";
import { Search } from "lucide-react";
import { Suspense } from "react";

function AllBooksContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const categories = ["All", "Story", "Tech", "Science"];

  const filtered = books.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || b.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">Our Collection</p>
        <h1 className="text-4xl font-black text-white mb-2">All <span className="gradient-text">Books</span></h1>
        <p className="text-gray-400">Browse our complete collection of books</p>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search books by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-12 py-4 text-base"
          style={{ maxWidth: "600px" }}
        />
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden md:block w-56 flex-shrink-0">
          <div className="book-card p-5 sticky top-24">
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    category === cat
                      ? "bg-amber-400/15 text-amber-400 border border-amber-400/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat}
                  <span className="float-right text-xs opacity-60">
                    {cat === "All" ? books.length : books.filter(b => b.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="flex-1">
          {/* Mobile Category Filter */}
          <div className="flex gap-2 mb-6 md:hidden overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  category === cat ? "bg-amber-400 text-black" : "bg-gray-800 text-gray-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-gray-400 text-sm mb-6">{filtered.length} books found</p>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">📭</div>
              <p className="text-lg font-medium">No books found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-400">Loading...</div>}>
      <AllBooksContent />
    </Suspense>
  );
}
