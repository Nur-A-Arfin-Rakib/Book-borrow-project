"use client";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import books from "@/lib/books";
import Link from "next/link";
import toast from "react-hot-toast";
import { ArrowLeft, BookOpen, User, Hash, CheckCircle } from "lucide-react";

const categoryClass = {
  Story: { bg: "rgba(59,130,246,0.1)", color: "#60a5fa" },
  Tech: { bg: "rgba(34,197,94,0.1)", color: "#4ade80" },
  Science: { bg: "rgba(168,85,247,0.1)", color: "#a78bfa" },
};

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="text-center py-32 text-gray-400">
        <div className="text-5xl mb-4">📚</div>
        <h2 className="text-2xl font-bold text-white mb-2">Book Not Found</h2>
        <Link href="/all-books" className="btn-primary mt-4">Back to Books</Link>
      </div>
    );
  }

  const handleBorrow = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    if (book.available_quantity === 0) {
      toast.error("This book is currently unavailable!");
      return;
    }
    toast.success(`🎉 Successfully borrowed "${book.title}"!`);
  };

  const cat = categoryClass[book.category] || categoryClass.Story;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link href="/all-books" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm">
        <ArrowLeft size={16} /> Back to All Books
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — Book Cover */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: "#161b22", border: "1px solid #30363d" }}>
            <img
              src={book.image_url}
              alt={book.title}
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.target.src = `https://placehold.co/400x500/21262d/f59e0b?text=${encodeURIComponent(book.title)}`;
              }}
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl -z-10" style={{ border: "1px solid rgba(245,158,11,0.2)" }} />
        </div>

        {/* Right — Details */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="badge text-sm px-3 py-1.5" style={{ background: cat.bg, color: cat.color }}>
              {book.category}
            </span>
            <span className="badge text-sm px-3 py-1.5" style={{
              background: book.available_quantity > 0 ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
              color: book.available_quantity > 0 ? "#4ade80" : "#f87171"
            }}>
              {book.available_quantity > 0 ? "Available" : "Unavailable"}
            </span>
          </div>

          <h1 className="text-4xl font-black text-white mb-3 leading-tight">{book.title}</h1>

          <div className="flex items-center gap-2 mb-6">
            <User size={16} className="text-amber-400" />
            <span className="text-amber-400 font-semibold">by {book.author}</span>
          </div>

          <p className="text-gray-400 leading-relaxed mb-8 text-base">{book.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl" style={{ background: "#161b22", border: "1px solid #30363d" }}>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={16} className="text-amber-400" />
                <span className="text-sm text-gray-400">Category</span>
              </div>
              <p className="font-bold text-white">{book.category}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: "#161b22", border: "1px solid #30363d" }}>
              <div className="flex items-center gap-2 mb-1">
                <Hash size={16} className="text-amber-400" />
                <span className="text-sm text-gray-400">Copies Left</span>
              </div>
              <p className="font-bold text-white">{book.available_quantity} copies</p>
            </div>
          </div>

          {/* Borrow Button */}
          <button
            onClick={handleBorrow}
            className="btn-primary w-full justify-center text-base py-4"
            disabled={book.available_quantity === 0}
            style={{ opacity: book.available_quantity === 0 ? 0.5 : 1 }}
          >
            <CheckCircle size={18} />
            {session ? "Borrow This Book" : "Login to Borrow"}
          </button>

          {!session && (
            <p className="text-center text-gray-400 text-sm mt-3">
              You need to <Link href="/login" className="text-amber-400 hover:underline">login</Link> to borrow books.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
