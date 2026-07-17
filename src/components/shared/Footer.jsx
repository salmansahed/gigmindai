import React from "react";
import { FaBrain } from "react-icons/fa6";
import { FiMail, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#0a0f1d] text-slate-400 py-12 px-6 z-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        
        {/* Logo & Info Column */}
        <div className="flex flex-col gap-4 text-left">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-[#10b981] to-[#06b6d4] flex items-center justify-center shadow-md">
              <FaBrain className="w-4 h-4 text-[#0a0f1d]" />
            </div>
            <span className="text-lg font-extrabold text-white">GigMind AI</span>
          </div>
          <p className="text-xs leading-relaxed max-w-xs">
            Matching elite tech talent with global corporations using advanced cognitive filtering engines.
          </p>
        </div>

        {/* Quick links */}
        <div className="text-left">
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-4">Platform</h4>
          <ul className="flex flex-col gap-2.5 text-xs">
            <li><a href="#categories" className="hover:text-emerald-400 transition-colors">Explore Categories</a></li>
            <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">Escrow Blueprint</a></li>
            <li><a href="#home" className="hover:text-emerald-400 transition-colors">Growth Statistics</a></li>
          </ul>
        </div>

        {/* Contacts */}
        <div className="text-left flex flex-col gap-3">
          <h4 className="text-xs uppercase tracking-wider font-bold text-white mb-2">Connect with Us</h4>
          <div className="flex items-center gap-2 text-xs">
            <FiMail className="w-4 h-4 text-[#06b6d4]" />
            <span>operations@gigmind.ai</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <FiMapPin className="w-4 h-4 text-[#06b6d4]" />
            <span>San Francisco, California</span>
          </div>
        </div>

        {/* Socials & Copyright */}
        <div className="text-left flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-wider font-bold text-white">Social Channels</h4>
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-all"
              aria-label="GitHub Link"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-all"
              aria-label="LinkedIn Link"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="max-w-7xl mx-auto border-t border-white/5 mt-8 pt-8 flex flex-col sm:flex-row justify-between text-[11px] text-slate-500">
        <span>&copy; {new Date().getFullYear()} GigMind AI Inc. All rights reserved.</span>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
