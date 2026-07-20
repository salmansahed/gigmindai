import React from "react";
import Link from "next/link";
import { FaBrain } from "react-icons/fa6";
import { FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0a0f1d] text-slate-400 py-12 px-6 z-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Logo & Info Column */}
        <div className="flex flex-col gap-4 text-left">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-[#10b981] to-[#06b6d4] flex items-center justify-center shadow-md">
              <FaBrain className="w-4 h-4 text-[#0a0f1d]" />
            </div>
            <span className="text-lg font-extrabold text-white">
              GigMind AI
            </span>
          </Link>
          <p className="text-xs leading-relaxed max-w-xs">
            Matching elite tech talent with global corporations using advanced
            cognitive filtering engines.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="text-left">
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
            Navigation
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs">
            <li>
              <Link
                href="/"
                className="hover:text-emerald-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore-jobs"
                className="hover:text-emerald-400 transition-colors"
              >
                Explore Jobs
              </Link>
            </li>
            <li>
              <Link
                href="/client/add-job"
                className="hover:text-emerald-400 transition-colors"
              >
                Add Job
              </Link>
            </li>
            <li>
              <Link
                href="/client/manage-gigs"
                className="hover:text-emerald-400 transition-colors"
              >
                Manage Gigs
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Company Links */}
        <div className="text-left">
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">
            Support & More
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs">
            <li>
              <Link
                href="/about-us"
                className="hover:text-emerald-400 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact-support"
                className="hover:text-emerald-400 transition-colors"
              >
                Contact Support
              </Link>
            </li>
            <li>
              <Link
                href="mailto:support@gigmind.ai"
                className="hover:text-emerald-400 transition-colors"
              >
                Email Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Contacts & Social Channels */}
        <div className="text-left flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-wider font-bold text-white">
            Connect with Us
          </h4>

          <div className="flex flex-col gap-2.5 text-xs">
            <Link
              href="mailto:support@gigmind.ai"
              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
            >
              <FiMail className="w-4 h-4 text-[#06b6d4]" />
              <span>support@gigmind.ai</span>
            </Link>
            <div className="flex items-center gap-2 text-xs">
              <FiMapPin className="w-4 h-4 text-[#06b6d4]" />
              <span>Bhaluka, Mymensingh, BD</span>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <Link
              href="https://github.com/salmansahed"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-all"
              aria-label="GitHub Link"
            >
              <FiGithub className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/salman-sahed"
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-all"
              aria-label="LinkedIn Link"
            >
              <FiLinkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Links */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row justify-between text-[11px] text-slate-500">
        <span>
          &copy; {new Date().getFullYear()} GigMind AI Inc. All rights reserved.
        </span>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Link
            href="/terms"
            className="hover:underline hover:text-slate-400 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="hover:underline hover:text-slate-400 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
