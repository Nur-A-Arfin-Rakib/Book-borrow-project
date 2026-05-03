"use client";
import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, User, Image, Save } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
    if (session) {
      setForm({
        name: session.user.name || "",
        image: session.user.image || "",
      });
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authClient.updateUser({
        name: form.name,
        image: form.image || undefined,
      });
      toast.success("Profile updated successfully! ✅");
      router.push("/my-profile");
    } catch (err) {
      toast.error("Failed to update profile!");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) return null;

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <Link href="/my-profile" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors text-sm">
        <ArrowLeft size={16} /> Back to Profile
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Update <span className="gradient-text">Profile</span></h1>
        <p className="text-gray-400 mt-2 text-sm">Update your name and profile photo</p>
      </div>

      <div className="p-8 rounded-2xl" style={{ background: "#161b22", border: "1px solid #30363d" }}>
        {/* Preview */}
        <div className="flex items-center gap-4 mb-8 p-4 rounded-xl" style={{ background: "#21262d" }}>
          {form.image ? (
            <img src={form.image} alt="Preview" className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/30" />
          ) : (
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(245,158,11,0.15)" }}>
              <User size={24} className="text-amber-400" />
            </div>
          )}
          <div>
            <p className="font-semibold text-white">{form.name || "Your Name"}</p>
            <p className="text-gray-400 text-sm">{session.user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="text" placeholder="Your full name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} required className="input-field pl-10" />
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Photo URL</label>
            <div className="relative">
              <Image size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="url" placeholder="https://example.com/photo.jpg" value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })} className="input-field pl-10" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3">
            <Save size={16} /> {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
