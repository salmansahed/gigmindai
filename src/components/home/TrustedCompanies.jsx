import React from "react";
import { Card } from "@heroui/react";

export default function TrustedCompanies() {
  return (
    <section className="py-12 border-t border-white/5 bg-[#0a0f1d]/40">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-6">
          Empowering Talents for Global Tech Leaders
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {["Meta", "Google", "NVIDIA", "Microsoft", "OpenAI", "Netflix"].map(
            (company, i) => (
              <Card
                key={i}
                className="bg-white/3 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:text-white/90 hover:bg-white/10 hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(6,180,212,0.15)] hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer select-none rounded-xl"
              >
                <div className="py-4 flex items-center justify-center font-bold tracking-wider text-slate-400">
                  {company}
                </div>
              </Card>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
