// Pure Server Component Orchestrator

import Hero from "../components/home/Hero";

export default function Home() {
  return (
    <main className="dark bg-[#0a0f1d] min-h-screen text-white grow pt-16">
      {/* 1. Hero Section (Server Component with Client island inside) */}
      <Hero />
    </main>
  );
}
