import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "BookBorrow — Online Book Borrowing Platform",
  description: "Explore, borrow, and enjoy books digitally.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#21262d",
              color: "#e6edf3",
              border: "1px solid #30363d",
            },
          }}
        />
      </body>
    </html>
  );
}
