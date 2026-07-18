import { Card, CardContent } from "@heroui/react";
import { FiCode, FiLayout, FiPenTool } from "react-icons/fi";
import { FaBrain } from "react-icons/fa6";

const CARD_CLASS =
  "bg-white/3 backdrop-blur-md border border-white/5 shadow-none rounded-2xl transition-all duration-300 ease-out group hover:-translate-y-1 hover:bg-white/7 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]";

const categories = [
  {
    icon: <FiCode className="w-8 h-8" />,
    iconBg: "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20",
    label: "Web Development",
    desc: "Full stack React, Next.js, and serverless architecture engineers.",
    count: "124 Active Gigs",
  },
  {
    icon: <FaBrain className="w-8 h-8" />,
    iconBg: "bg-emerald-500/10 text-emerald-400 group-hover:bg-cyan-500/20",
    label: "AI & Data Science",
    desc: "Machine learning models, PyTorch experts, and data analysis pipelines.",
    count: "85 Active Gigs",
  },
  {
    icon: <FiLayout className="w-8 h-8" />,
    iconBg: "bg-indigo-500/10 text-indigo-400 group-hover:bg-cyan-500/20",
    label: "UI/UX Design",
    desc: "Futuristic interface layouts, wireframing, and interactive design systems.",
    count: "67 Active Gigs",
  },
  {
    icon: <FiPenTool className="w-8 h-8" />,
    iconBg: "bg-pink-500/10 text-pink-400 group-hover:bg-cyan-500/20",
    label: "Technical Writing",
    desc: "Clear documentation, SDK tutorials, and technical blog optimization.",
    count: "43 Active Gigs",
  },
];

export default function PopularCategories() {
  return (
    <section
      id="categories"
      className="py-20 max-w-7xl mx-auto px-6 text-center"
    >
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Explore Popular Job Sectors
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Find top freelance experts filtered and score-ranked by our cognitive
          verification engines.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Card key={cat.label} className={CARD_CLASS}>
            <div className="flex flex-col items-center justify-between text-center p-6 gap-4">
              {/* Icon badge */}
              <div
                className={`p-4 rounded-2xl ${cat.iconBg} transition-all duration-300 ease-out group-hover:scale-110 group-hover:text-cyan-400`}
              >
                {cat.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {cat.label}
                </h3>
                <p className="text-xs text-slate-400 px-4 mb-4">{cat.desc}</p>
              </div>

              {/* Gig count badge */}
              <div className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full uppercase tracking-wider transition-all duration-300 ease-out group-hover:bg-emerald-500/20 group-hover:text-emerald-300">
                {cat.count}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
