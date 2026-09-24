"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

const navItems = [
  { href: "#overview", label: "Overview" },
  { href: "#scenarios", label: "Scenarios" },
  { href: "#alternatives", label: "Alternatives" },
  { href: "#inventory", label: "Inventory" },
  { href: "#decision-plan", label: "Decision Plan" },
  { href: "#alerts", label: "Alerts" },
];

export function Navbar() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("energybridge-theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.body.dataset.theme = nextTheme;
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("energybridge-theme", theme);
  }, [theme]);

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-lg font-bold text-white shadow-lg shadow-orange-500/20">
            S
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Prototype
            </p>
            <Link href="#overview" className="text-xl font-bold text-slate-100">
              StraitBridge
            </Link>
          </div>
        </div>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-300 lg:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
            className="hidden rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 sm:inline-flex"
          >
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>

          <div className="hidden rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-300 sm:block">
            Prototype demo
          </div>
          {user ? (
            <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-200 md:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>{user.name}</span>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-full border border-slate-700 bg-slate-900 p-2 text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 lg:hidden"
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="hidden rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800 lg:inline-flex"
          >
            Logout
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-2 text-sm font-medium text-slate-300">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 transition hover:bg-slate-800 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setTheme((prev) => (prev === "light" ? "dark" : "light"));
                setMenuOpen(false);
              }}
              className="mt-2 rounded-xl border border-slate-700 px-3 py-2 text-left text-sm font-semibold text-slate-200"
            >
              {theme === "light" ? "Dark mode" : "Light mode"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-2 rounded-xl bg-slate-800 px-3 py-2 text-left text-sm font-semibold text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
