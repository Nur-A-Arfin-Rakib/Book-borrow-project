"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { BookOpen, Mail, Lock, User, Image, Globe } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", image: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.image || undefined,
      });
      if (res.error) {
        toast.error(res.error.message || "Registration failed!");
      } else {
        toast.success("Account created! Please login. 🎉");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: "#f59e0b" }}>
            <BookOpen size={28} color="#0d1117" />
          </div>
          <h1 className="text-3xl font-black text-white mb-1">Create Account</h1>
          <p className="text-gray-400 text-sm">Join BookBorrow today — it's free!</p>
        </div>

        <div className="p-8 rounded-2xl" style={{ background: "#161b22", border: "1px solid #30363d" }}>
          <button onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm transition-all mb-6"
            style={{ background: "#21262d", border: "1px solid #30363d", color: "#e6edf3" }}>
            <Globe size={18} className="text-blue-400" />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "#30363d" }} />
            <span className="text-gray-500 text-xs">or register with email</span>
            <div className="flex-1 h-px" style={{ background: "#30363d" }} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Your full name" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} required className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" placeholder="you@example.com" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} required className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Photo URL (optional)</label>
              <div className="relative">
                <Image size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="url" placeholder="https://example.com/photo.jpg" value={form.image}
                  onChange={e => setForm({ ...form, image: e.target.value })} className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="password" placeholder="Min 8 characters" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })} required minLength={8} className="input-field pl-10" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-400 hover:underline font-medium">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
