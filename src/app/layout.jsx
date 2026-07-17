import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GigMind AI - Hire Top Freelance Talents with AI Power",
  description:
    "Experience the next-generation AI-powered freelancing platform. Connect with elite talent, verify resumes instantly with AI, and secure matches effortlessly.",
  keywords: [
    "AI freelance",
    "freelancer",
    "gig economy",
    "hire talents",
    "AI matching",
    "tech jobs",
  ],
  authors: [{ name: "GigMind AI Team" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="gradient-bg-mesh min-h-full flex flex-col antialiased text-white">
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
      </body>
    </html>
  );
}
