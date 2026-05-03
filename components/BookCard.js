"use client";

import Link from "next/link";
import Image from "next/image";

const categoryClass = {
  Story: "badge-story",
  Tech: "badge-tech",
  Science: "badge-science",
};

export default function BookCard({ book }) {
  return (
    <div className="book-card flex flex-col">
      <div className="relative h-52 overflow-hidden" style={{ background: "#0d1117" }}>
        <img
          src={book.image_url}
          alt={book.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x400/21262d/f59e0b?text=${encodeURIComponent(book.title)}`;
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`badge ${categoryClass[book.category] || "badge-story"}`}>
            {book.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge" style={{ background: book.available_quantity > 0 ? "#15803d20" : "#dc262620", color: book.available_quantity > 0 ? "#4ade80" : "#f87171" }}>
            {book.available_quantity > 0 ? `${book.available_quantity} left` : "Unavailable"}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-white text-base mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-amber-400 text-sm mb-2">by {book.author}</p>
        <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-3 mb-4">{book.description}</p>
        <Link href={`/books/${book.id}`} className="btn-primary justify-center text-sm">
          View Details
        </Link>
      </div>
    </div>
  );
}
