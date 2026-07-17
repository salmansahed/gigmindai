"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaBrain } from "react-icons/fa6";

// ─── Navigation Route Definitions ────────────────────────────────────────────

const LOGGED_OUT_ROUTES = [
  { label: "Home", href: "#home" },
  { label: "Explore Jobs", href: "#categories" },
  { label: "About", href: "#about" },
];

const LOGGED_IN_ROUTES = [
  { label: "Home", href: "#home" },
  { label: "Explore Jobs", href: "#categories" },
  { label: "Add Job", href: "#add-job" },
  { label: "Manage Gigs", href: "#manage-jobs" },
  { label: "About", href: "#about" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleAuthToggle = useCallback(() => {
    setIsLoggedIn((prev) => !prev);
    closeMenu();
  }, [closeMenu]);

  const activeRoutes = isLoggedIn ? LOGGED_IN_ROUTES : LOGGED_OUT_ROUTES;

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50"
      aria-label="Main navigation"
    >
      {/* ── Frosted glass backdrop strip ─────────────────────────────────── */}
      <div className="bg-[#0a0f1d]/70 backdrop-blur-2xl border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo ─────────────────────────────────────────────────── */}
            <Link
              href="#home"
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="GigMind AI – go to homepage"
              onClick={closeMenu}
            >
              {/* Icon badge */}
              <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-tr from-emerald-500 to-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.45)] group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] transition-all duration-300">
                <FaBrain className="w-5 h-5 text-[#0a0f1d]" />
              </span>

              {/* Wordmark */}
              <span className="text-[1.15rem] font-extrabold tracking-wide leading-none">
                <span className="text-white/90 drop-shadow-[0_0_8px_rgba(6,182,212,0.25)]">
                  GigMind{" "}
                </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-300 drop-shadow-none">
                  AI
                </span>
              </span>
            </Link>

            {/* ── Desktop nav links ─────────────────────────────────────── */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {activeRoutes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className="relative px-4 py-2 text-sm font-medium text-slate-300 rounded-lg hover:text-white hover:bg-white/6 active:scale-95 transition-all duration-200 group"
                  >
                    {route.label}
                    {/* Active underline micro-animation */}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-0.5 rounded-full bg-linear-to-r from-emerald-500 to-cyan-400 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Desktop CTA ───────────────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-3">
              {/* Auth-state badge */}
              <span
                className={`hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-colors duration-300 ${
                  isLoggedIn
                    ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/8"
                    : "text-slate-500 border-white/10 bg-white/4"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLoggedIn ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                  }`}
                />
                {isLoggedIn ? "Logged In" : "Guest"}
              </span>

              {isLoggedIn ? (
                <Button
                  onPress={handleAuthToggle}
                  size="sm"
                  aria-label="Log out of your account"
                  className="text-xs font-semibold uppercase tracking-wider text-red-300 border-red-500/20 bg-red-500/8 hover:bg-red-500/16 hover:border-red-500/40"
                >
                  Log Out
                </Button>
              ) : (
                <Button
                  onPress={handleAuthToggle}
                  aria-label="Simulate logging into your account"
                  className="px-6 text-xs font-black uppercase tracking-widest text-[#0a0f1d] bg-linear-to-r from-emerald-500 to-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.5)] overflow-hidden"
                >
                  Login
                </Button>
              )}
            </div>

            {/* ── Mobile hamburger ─────────────────────────────────────── */}
            <Button
              isIconOnly
              onPress={toggleMenu}
              size="sm"
              className="md:hidden text-slate-300 hover:text-white hover:bg-white/8"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span
                className="transition-transform duration-300"
                style={{
                  transform: isMobileMenuOpen
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-5 h-5" />
                ) : (
                  <FiMenu className="w-5 h-5" />
                )}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown panel ─────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-120 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0a0f1d]/90 backdrop-blur-2xl border-b border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
            {/* Mobile links */}
            {activeRoutes.map((route, idx) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={closeMenu}
                className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 rounded-xl hover:text-white hover:bg-white/6 active:bg-white/10 transition-all duration-200 group"
                style={{ transitionDelay: `${idx * 30}ms` }}
              >
                <span>{route.label}</span>
                <FiChevronDown className="w-3.5 h-3.5 -rotate-90 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all duration-200" />
              </Link>
            ))}

            {/* Divider */}
            <div className="my-1 border-t border-white/6" />

            {/* Mobile auth button + status */}
            <div className="flex items-center justify-between px-2 py-2 gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                  isLoggedIn
                    ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/8"
                    : "text-slate-500 border-white/10 bg-white/4"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLoggedIn ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                  }`}
                />
                {isLoggedIn ? "Logged In" : "Guest Mode"}
              </span>

              {isLoggedIn ? (
                <Button
                  onPress={handleAuthToggle}
                  size="sm"
                  className="text-xs font-semibold uppercase tracking-wider text-red-300 border-red-500/20 bg-red-500/8 hover:bg-red-500/16"
                >
                  Log Out
                </Button>
              ) : (
                <Button
                  onPress={handleAuthToggle}
                  className="px-6 text-xs font-black uppercase tracking-widest text-[#0a0f1d] bg-linear-to-r from-emerald-500 to-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
