"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaBrain } from "react-icons/fa6";
import { useClientUserSession } from "../../hooks/useClientUserSession";
import LogoutModal from "../auth/LogoutModal";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ─── Navigation Route Definitions ────────────────────────────────────────────

const roleUser = [
  { label: "Home", href: "/" },
  { label: "Explore Jobs", href: "/explore-jobs" },
  { label: "About", href: "/about-us" },
];

const roleClient = [
  { label: "Home", href: "/" },
  { label: "Explore Jobs", href: "/explore-jobs" },
  { label: "Add Job", href: "/client/add-job" },
  { label: "Manage Gigs", href: "/client/manage-gigs" },
  { label: "About", href: "/about-us" },
];

const roleFreelancer = [
  { label: "Home", href: "/" },
  { label: "Explore Jobs", href: "/explore-jobs" },
  { label: "My Applications", href: "/freelancer/my-applications" },
  { label: "Saved Gigs", href: "/freelancer/saved-gigs" },
  { label: "About", href: "/about-us" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const currentPath = usePathname();
  const { user, isPending } = useClientUserSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = !!user;
  const activeRoutes = isLoggedIn
    ? user?.role === "client"
      ? roleClient
      : user?.role === "freelancer"
        ? roleFreelancer
        : roleUser
    : roleUser;

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

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
              href="/"
              className="flex items-center gap-2.5 group shrink-0"
              onClick={closeMenu}
            >
              <span className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-tr from-emerald-500 to-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.45)] group-hover:scale-105 group-hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] transition-all duration-300">
                <FaBrain className="w-5 h-5 text-[#0a0f1d]" />
              </span>
              <span className="text-[1.15rem] font-extrabold tracking-wide leading-none">
                <span className="text-white/90 drop-shadow-[0_0_8px_rgba(6,182,212,0.25)]">
                  GigMind{" "}
                </span>
                <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-300">
                  AI
                </span>
              </span>
            </Link>

            {/* ── Desktop nav links ─────────────────────────────────────── */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {activeRoutes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={`relative px-4 py-2 text-sm font-medium text-slate-300 rounded-lg hover:text-white hover:bg-white/6 active:scale-95 transition-all duration-200 group ${currentPath === route.href ? "text-white bg-white/10" : ""}`}
                  >
                    {route.label}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-0.5 rounded-full bg-linear-to-r from-emerald-500 to-cyan-400 transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Desktop CTA ───────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Loading skeleton */}
              {isPending ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-11 h-11 rounded-full bg-white/10" />
                  <div className="flex flex-col gap-2">
                    <div className="w-24 h-3 rounded-full bg-white/10" />
                    <div className="w-16 h-2 rounded-full bg-white/5" />
                  </div>
                  <div className="h-6 w-px bg-white/10 mx-2" />
                  <div className="w-16 h-8 rounded-lg bg-white/10" />
                </div>
              ) : isLoggedIn ? (
                // user is logged in, show profile and logout
                <>
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full p-0.5 border-2 border-cyan-500/80 shadow-[0_0_12px_rgba(6,182,212,0.4)] shrink-0">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={user?.image}
                          alt={user?.name || "User profile"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-semibold tracking-wide text-white leading-tight">
                        {user?.name}
                      </span>
                      <span className="text-xs font-medium text-slate-400 leading-none mt-0.5 capitalize">
                        {user?.role}
                      </span>
                    </div>
                  </div>

                  <div className="h-6 w-px bg-white/50 mx-4 shrink-0" />

                  <LogoutModal />
                </>
              ) : (
                // guest user, show sign up/login buttons
                <>
                  <Link href="/auth/sign-up">
                    <Button
                      variant="outline"
                      className="px-6 text-xs font-black uppercase tracking-widest text-white border-white/40 hover:bg-white/10"
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button className="px-6 text-xs font-black uppercase tracking-widest text-[#0a0f1d] bg-linear-to-r from-emerald-500 to-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.5)]">
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile hamburger ─────────────────────────────────────── */}
            <Button
              isIconOnly
              onPress={toggleMenu}
              size="sm"
              className="lg:hidden text-slate-300 hover:text-white hover:bg-white/8 bg-transparent"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown panel ─────────────────────────────────────────── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-120 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-[#0a0f1d]/90 backdrop-blur-2xl border-b border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
            {activeRoutes.map((route, idx) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={closeMenu}
                className={`flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-300 rounded-xl hover:text-white hover:bg-white/6 transition-all duration-200 group ${currentPath === route.href ? "text-white bg-white/10" : ""}`}
                style={{ transitionDelay: `${idx * 30}ms` }}
              >
                <span>{route.label}</span>
                <FiChevronDown className="w-3.5 h-3.5 -rotate-90 text-slate-600 group-hover:text-emerald-400 transition-all duration-200" />
              </Link>
            ))}

            <div className="my-1 border-t border-white/6" />

            <div className="flex items-center justify-between px-2 py-2 gap-3">
              {/* Loading state skeleton for mobile menu */}
              {isPending ? (
                <div className="flex items-center gap-3 w-full animate-pulse">
                  <div className="w-full h-10 rounded-lg bg-white/5" />
                  <div className="w-full h-10 rounded-lg bg-white/5" />
                </div>
              ) : isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full p-0.5 border-2 border-cyan-500/80 shadow-[0_0_12px_rgba(6,182,212,0.4)] shrink-0">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={user?.image}
                          alt={user?.name || "User profile"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-semibold tracking-wide text-white leading-tight">
                        {user?.name}
                      </span>
                      <span className="text-xs font-medium text-slate-400 leading-none mt-0.5 capitalize">
                        {user?.role}
                      </span>
                    </div>
                  </div>

                  <div className="h-6 w-px bg-white/50 mx-4 shrink-0" />

                  <LogoutModal />
                </>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <Link
                    href="/auth/sign-up"
                    className="flex-1"
                    onClick={closeMenu}
                  >
                    <Button
                      variant="outline"
                      className="w-full px-6 text-xs font-black uppercase tracking-widest text-white border-white/40 hover:bg-white/10"
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link
                    href="/auth/login"
                    className="flex-1"
                    onClick={closeMenu}
                  >
                    <Button className="w-full px-6 text-xs font-black uppercase tracking-widest text-[#0a0f1d] bg-linear-to-r from-emerald-500 to-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.5)]">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
