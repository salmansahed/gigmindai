import Link from "next/link";
import {
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiUserCheck,
  FiArrowLeft,
} from "react-icons/fi";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white pt-28 pb-16 px-6 relative overflow-hidden flex justify-center">
      {/* Background glow effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00e599]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-[#00e599] transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="mb-12 text-center md:text-left border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-4">
            <FiShield className="w-3.5 h-3.5" /> Security & Transparency
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00e599] to-cyan-400">
              Policy
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400">
            Last Updated: July 20, 2026 • Effective Date: July 20, 2026
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-10 text-slate-300 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white font-bold text-lg mb-1">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <FiEye className="w-5 h-5" />
              </div>
              <h2>1. Information We Collect</h2>
            </div>
            <p className="text-slate-400">
              At GigMind AI, we value your trust. We collect limited personal
              data required to provide seamless matching between clients and
              freelancers:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2">
              <li>
                Account credentials (Name, Email Address, Profile Picture).
              </li>
              <li>
                Professional information (Skills, Deliverables, Gig details).
              </li>
              <li>
                Communication data exchanged between users and our support
                system.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white font-bold text-lg mb-1">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <FiDatabase className="w-5 h-5" />
              </div>
              <h2>2. How We Use Your Data</h2>
            </div>
            <p className="text-slate-400">
              Your information helps us optimize our AI matching engine and
              service quality. We use your data to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2">
              <li>
                Connect freelancers with top clients and relevant gig
                opportunities.
              </li>
              <li>
                Manage authenticated user sessions and verify credentials.
              </li>
              <li>
                Provide customer support and resolve technical inquiries
                promptly.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white font-bold text-lg mb-1">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <FiLock className="w-5 h-5" />
              </div>
              <h2>3. Data Protection & Security</h2>
            </div>
            <p className="text-slate-400">
              We employ industry-standard encryption protocols and secure
              database architectures to safeguard your data against unauthorized
              access, loss, or misuse.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white font-bold text-lg mb-1">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <FiUserCheck className="w-5 h-5" />
              </div>
              <h2>4. Your Privacy Rights</h2>
            </div>
            <p className="text-slate-400">
              You retain full control over your personal data. At any time, you
              have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2">
              <li>
                View, update, or delete your posted gigs and profile
                information.
              </li>
              <li>Request the complete deletion of your GigMind AI account.</li>
            </ul>
          </section>

          {/* Contact Notice */}
          <div className="border-t border-white/10 pt-6 text-center text-xs text-slate-400">
            Have questions regarding our privacy practices? Reach out via our{" "}
            <Link
              href="/contact-support"
              className="text-[#00e599] hover:underline font-semibold"
            >
              Contact Support
            </Link>{" "}
            page.
          </div>
        </div>
      </div>
    </div>
  );
}
