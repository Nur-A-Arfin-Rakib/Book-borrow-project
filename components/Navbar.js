"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { BookOpen, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    router.push("/");
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/all-books", label: "All Books" },
    { href: "/my-profile", label: "My Profile" },
  ];

  return (
    <nav style={{ background: "#161b22", borderBottom: "1px solid #30363d" }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f59e0b" }}>
            <BookOpen size={18} color="#0d1117" />
          </div>
          <span className="gradient-text">BookBorrow</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === l.href
                  ? "text-amber-400 bg-amber-400/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center">
                  <User size={16} className="text-amber-400" />
                </div>
                <span className="font-medium">{session.user.name}</span>
              </div>
              <button onClick={handleLogout} className="btn-outline text-sm py-2 px-4">
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn-primary text-sm py-2 px-5">
              Login
            </Link>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div style={{ borderTop: "1px solid #30363d", background: "#161b22" }} className="md:hidden px-6 py-4 flex flex-col gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-gray-400 hover:text-white py-2 text-sm font-medium">
              {l.label}
            </Link>
          ))}
          {session ? (
            <button onClick={handleLogout} className="btn-outline mt-2 justify-center text-sm">
              <LogOut size={14} /> Logout
            </button>
          ) : (
            <Link href="/login" className="btn-primary mt-2 justify-center text-sm">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
