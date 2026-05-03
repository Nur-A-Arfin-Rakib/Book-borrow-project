"use client";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { User, Mail, Edit, LogOut, BookOpen, Shield } from "lucide-react";
import toast from "react-hot-toast";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    router.push("/");
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-2">Account</p>
        <h1 className="text-4xl font-black text-white">My <span className="gradient-text">Profile</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="p-6 rounded-2xl text-center" style={{ background: "#161b22", border: "1px solid #30363d" }}>
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-amber-400/30" />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(245,158,11,0.15)", border: "4px solid rgba(245,158,11,0.3)" }}>
                <User size={36} className="text-amber-400" />
              </div>
            )}
            <h2 className="font-bold text-white text-xl mb-1">{user.name}</h2>
            <p className="text-gray-400 text-sm mb-4">{user.email}</p>
            <div className="flex items-center justify-center gap-2 text-xs text-green-400 mb-6">
              <Shield size={12} />
              <span>Verified Account</span>
            </div>
            <Link href="/update-profile" className="btn-primary w-full justify-center text-sm py-2.5">
              <Edit size={14} /> Update Profile
            </Link>
            <button onClick={handleLogout} className="btn-outline w-full justify-center text-sm py-2.5 mt-3">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="md:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl" style={{ background: "#161b22", border: "1px solid #30363d" }}>
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <User size={18} className="text-amber-400" /> Personal Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "#21262d" }}>
                <User size={18} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Full Name</p>
                  <p className="text-white font-medium">{user.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "#21262d" }}>
                <Mail size={18} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                  <p className="text-white font-medium">{user.email}</p>
                </div>
              </div>
              {user.image && (
                <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "#21262d" }}>
                  <BookOpen size={18} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Profile Photo</p>
                    <a href={user.image} target="_blank" rel="noreferrer" className="text-amber-400 text-sm hover:underline truncate block max-w-xs">
                      View Photo
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 rounded-2xl" style={{ background: "#161b22", border: "1px solid #30363d" }}>
            <h3 className="font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/all-books" className="p-4 rounded-xl text-center transition-all hover:border-amber-400/50 cursor-pointer block"
                style={{ background: "#21262d", border: "1px solid #30363d" }}>
                <BookOpen size={24} className="text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-white">Browse Books</p>
                <p className="text-xs text-gray-400 mt-0.5">Find your next read</p>
              </Link>
              <Link href="/update-profile" className="p-4 rounded-xl text-center transition-all hover:border-amber-400/50 cursor-pointer block"
                style={{ background: "#21262d", border: "1px solid #30363d" }}>
                <Edit size={24} className="text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-white">Edit Profile</p>
                <p className="text-xs text-gray-400 mt-0.5">Update your info</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
