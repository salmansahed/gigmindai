// Pure Server Component Orchestrator

import Hero from "../components/home/Hero";
import PopularCategories from "../components/home/PopularCategories";
import Stats from "../components/home/Stats";
import TrustedCompanies from "../components/home/TrustedCompanies";

export default function Home() {
  return (
    <main className="dark bg-[#0a0f1d] min-h-screen text-white grow pt-16">
      {/* 1. Hero Section (Server Component with Client island inside) */}
      <Hero />
      {/* 2. Trusted Companies (Server Component) */}
      <TrustedCompanies />
      {/* 3. Popular Categories (Server Component) */}
      <PopularCategories />
      {/* 4. Platform Statistics & Sparkline Chart (Server Component) */}
      <Stats />
    </main>
  );
}
