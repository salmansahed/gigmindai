import Link from "next/link";
import {
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiUserCheck,
  FiArrowLeft,
  FiShieldOff,
} from "react-icons/fi";

export default function TermsOfService() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-4">
            <FiFileText className="w-3.5 h-3.5" /> Legal Agreement
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Terms of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00e599] to-cyan-400">
              Service
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
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <h2>1. Acceptance of Terms</h2>
            </div>
            <p className="text-slate-400">
              By accessing or using the GigMind AI platform, you agree to be
              bound by these Terms of Service. If you do not agree to all terms,
              you may not access or use our services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white font-bold text-lg mb-1">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <FiUserCheck className="w-5 h-5" />
              </div>
              <h2>2. User Accounts & Verification</h2>
            </div>
            <p className="text-slate-400">
              Users are responsible for maintaining the confidentiality of their
              account credentials. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2">
              <li>
                Provide accurate and complete information during registration.
              </li>
              <li>Keep your account credentials secure at all times.</li>
              <li>
                Notify us immediately of any unauthorized use of your account.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white font-bold text-lg mb-1">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <FiAlertCircle className="w-5 h-5" />
              </div>
              <h2>3. Gig Postings & Services</h2>
            </div>
            <p className="text-slate-400">
              GigMind AI connects clients with top freelance tech talent. Users
              posting or applying for gigs must ensure all project requirements,
              deliverables, and service representations are genuine and
              accurate.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white font-bold text-lg mb-1">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <FiShieldOff className="w-5 h-5" />
              </div>
              <h2>4. Prohibited Conduct</h2>
            </div>
            <p className="text-slate-400">
              Users are strictly prohibited from engaging in activities that
              harm the platform or other users, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 pl-2">
              <li>
                Posting fraudulent, misleading, or illegal gig opportunities.
              </li>
              <li>
                Attempting to bypass security mechanisms or API endpoints.
              </li>
              <li>
                Harassing or abusing other platform users or support staff.
              </li>
            </ul>
          </section>

          {/* Contact Notice */}
          <div className="border-t border-white/10 pt-6 text-center text-xs text-slate-400">
            If you have any questions regarding these Terms of Service, please
            reach out via our{" "}
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
