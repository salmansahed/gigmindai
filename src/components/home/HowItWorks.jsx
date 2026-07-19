import { Card } from "@heroui/react";
import { FiUploadCloud, FiCpu, FiLock } from "react-icons/fi";

const CARD_CLASS =
  "bg-white/3 backdrop-blur-md border border-white/5 shadow-none rounded-2xl transition-all duration-300 ease-out group hover:-translate-y-1 hover:bg-white/7 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]";

const steps = [
  {
    number: "1",
    numberColor: "text-[#10b981]",
    icon: <FiUploadCloud className="w-5 h-5" />,
    title: "Post a Custom Gig",
    desc: "Describe your project, define tech stack tags, and set rates. Our system compiles guidelines instantly.",
  },
  {
    number: "2",
    numberColor: "text-[#06b6d4]",
    icon: <FiCpu className="w-5 h-5" />,
    title: "AI Smart Verification",
    desc: "The cognitive engine filters candidate histories and scores their actual code matches matching your tags.",
  },
  {
    number: "3",
    numberColor: "text-[#a855f7]",
    icon: <FiLock className="w-5 h-5" />,
    title: "Secure Contracting",
    desc: "Lock milestones securely in smart escrow accounts. Release earnings dynamically as milestones are met.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 max-w-7xl mx-auto px-6 text-center"
    >
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Our Workflow Blueprint
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Posting a gig to matching an elite developer takes less than 5
          minutes.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <Card key={step.number} className={CARD_CLASS}>
            <div className="flex flex-col items-center p-6">
              {/* Step number bubble */}
              <div
                className={`w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black ${step.numberColor} mb-6 shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:text-cyan-400`}
              >
                {step.number}
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
