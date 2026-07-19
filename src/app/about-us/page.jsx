import Link from "next/link";
import { Card, Button } from "@heroui/react";

// Platform data
const platformPillars = [
  {
    icon: "🧠",
    title: "Autonomous Agent Reasoning",
    description:
      "Unlike static keyword matches, our Agentic AI features break down job parameters into multi-layered semantic graphs. The model autonomously analyzes portfolio architectures, stack alignment, and developer velocity to predict optimal team compatibility.",
  },
  {
    icon: "⚙️",
    title: "Tool Usage and Validation Pipeline",
    description:
      "Built with comprehensive LLM integration, our platform uses custom prompt templates and background agents to validate live developer records, code repository signals, and cryptographic trust indexes without manual human intervention.",
  },
  {
    icon: "⚡",
    title: "Deterministic Execution",
    description:
      "By marrying modern full-stack engineering with real-world AI reasoning, the system eliminates prolonged interview friction. We spin up autonomous workflows that evaluate, classify, and match requirements in less than 60 seconds.",
  },
];

const aiFeatures = [
  {
    type: "AI Feature A",
    name: "AI Smart Recommendation Engine",
    capabilities: [
      "Context-aware project and profile matching based on continuous historical interactions",
      "Dynamic background vector search updating client specifications dynamically",
      "Multi-field algorithmic filtering across price metrics, core skill domains, and timeline priority",
    ],
  },
  {
    type: "AI Feature B",
    name: "AI Content and Gig Generator",
    capabilities: [
      "Custom prompt templates ensuring optimized, production-ready project descriptions",
      "Adjustable output constraints allowing real-time length, tone, and scope alterations",
      "One-click complete regeneration model powered by advanced Large Language Models",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white overflow-hidden relative font-sans selection:bg-[#00e599]/30">
      {/* Background elements */}
      <div className="absolute top-[-5%] left-[-5%] w-100 h-100 bg-[#00e599]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-125 h-125 bg-[#3b82f6]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#00e599] bg-[#00e599]/10 border border-[#00e599]/20 px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e599] animate-pulse" />
            Platform Architecture and Vision
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-6 bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Bridging Full-Stack Engineering with{" "}
            <span className="text-[#00e599] drop-shadow-[0_0_15px_rgba(0,229,153,0.25)]">
              Agentic Intelligence
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            GigMindAi is a production-ready Full Stack Agentic AI Application
            built to pioneer the next generation of digital collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {platformPillars.map((pillar, index) => (
            <Card
              key={`pillar-${index}`}
              className="bg-white/3 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-6 transition-all duration-300 hover:border-[#00e599]/30 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0a0f1d] border border-white/10 flex items-center justify-center text-lg mb-5 shadow-inner group-hover:border-[#00e599]/30 transition-colors">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-3 tracking-wide">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {pillar.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Features section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
              Core Autonomous Workflows
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiFeatures.map((feature, idx) => (
              <Card
                key={`feature-${idx}`}
                className="bg-white/3 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-[#00e599]/10 border-b border-l border-white/5 text-[#00e599] text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-wider rounded-bl-xl">
                  {feature.type}
                </div>
                <h4 className="text-base font-bold text-white mb-4 pr-16">
                  {feature.name}
                </h4>
                <ul className="space-y-3">
                  {feature.capabilities.map((capability, capIdx) => (
                    <li
                      key={`cap-${idx}-${capIdx}`}
                      className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed"
                    >
                      <span className="text-[#00e599] mt-0.5 select-none">
                        ✓
                      </span>
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-white/3 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-25%] w-87.5 h-87.5 bg-[#00e599]/5 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-xl md:text-3xl font-black text-white mb-4 tracking-tight">
            Explore Cognitive Agent Infrastructure
          </h2>
          <div className="flex justify-center gap-3">
            <Link href="/explore-jobs">
              <Button className="bg-[#00e599] hover:bg-[#00c885] text-[#0a0f1d] font-bold rounded-xl text-xs px-6 shadow-[0_0_20px_rgba(0,229,153,0.2)] transition-all">
                Initialize System
              </Button>
            </Link>
            <Link href="/about-us">
              <Button className="border-white/20 hover:border-white/40 text-white font-semibold rounded-xl text-xs px-6 transition-all">
                Documentation
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
