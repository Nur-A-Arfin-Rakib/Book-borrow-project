"use client";
import Link from "next/link";
import { BookOpen, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#161b22", borderTop: "1px solid #30363d" }} className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#f59e0b" }}>
                <BookOpen size={18} color="#0d1117" />
              </div>
              <span style={{ color: "#f59e0b" }}>BookBorrow</span>
            </div>
            <p className="text-sm" style={{ color: "#8b949e" }}>Your digital library platform.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm" style={{ color: "#8b949e" }}>
              <Link href="/" className="hover:text-amber-400">Home</Link>
              <Link href="/all-books" className="hover:text-amber-400">All Books</Link>
              <Link href="/my-profile" className="hover:text-amber-400">My Profile</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Contact Us</h4>
            <a href="mailto:arfinrakib2017@gmail.com" className="flex items-center gap-2 text-sm" style={{ color: "#8b949e" }}>
              <Mail size={14} /> arfinrakib2017@gmail.com
            </a>
            <div className="flex gap-3 mt-2">
              <a href="https://github.com/Nur-A-Arfin-Rakib" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center hover:text-amber-400" style={{ border: "1px solid #30363d" }}>
                <Globe size={16} />
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #30363d" }} className="pt-6 text-center text-sm" style={{ color: "#8b949e" }}>
          © 2026 BookBorrow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}