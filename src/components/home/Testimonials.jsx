import { Card } from "@heroui/react";
import { FaStar } from "react-icons/fa6";

const CARD_CLASS =
  "bg-white/3 backdrop-blur-md border border-white/5 shadow-none rounded-2xl transition-all duration-300 ease-out group hover:-translate-y-1 hover:bg-white/7 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]";

const testimonialsData = [
  {
    quote:
      '"Finding reliable Web3 and React developers used to take weeks. With GigMind\'s AI scanner matching code styles, we contracted a lead dev in 2 hours."',
    name: "Sandro Kovac",
    role: "CTO, Decentrix Inc.",
    initials: "SK",
    avatarColor: "bg-cyan-500/10 text-cyan-400",
  },
  {
    quote:
      '"As a machine learning engineer, GigMind matching filters let me skipped multiple HR screens. The escrow system is fast and milestone lock is clear."',
    name: "Yuki Lin",
    role: "Senior AI Specialist",
    initials: "YL",
    avatarColor: "bg-emerald-500/10 text-emerald-400",
  },
  {
    quote:
      '"Instantly matching technical authors saved our doc sprint. The content matching check aligned perfectly with our developer API guidelines."',
    name: "Tariq Rahman",
    role: "Head of Docs, PayCore",
    initials: "TR",
    avatarColor: "bg-purple-500/10 text-purple-400",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 border-t border-white/5 bg-[#0a0f1d]/20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            What Our Clients Say
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Hear from businesses and programmers utilizing GigMind AI to
            accelerate software shipping.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonialsData.map((t) => (
            <Card key={t.name} className={CARD_CLASS}>
              <div className="text-left flex flex-col justify-between p-6">
                {/* Stars */}
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="w-4 h-4 text-emerald-500 transition-all duration-300 group-hover:scale-110 group-hover:text-cyan-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed mb-6">
                    {t.quote}
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div
                    className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center font-bold`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{t.name}</h4>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
