"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, signIn } = useAuth();
  const [email, setEmail] = useState("operator@energybridge.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ok = signIn(email, password);

    if (!ok) {
      setError("Invalid email or password. Use operator@energybridge.com / password123.");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#111827_40%,_#020617_100%)] px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-700/70 bg-slate-900/80 shadow-[0_30px_90px_rgba(15,23,42,0.65)] backdrop-blur-xl">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-slate-700/70 p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
              EnergyBridge
            </div>

            <h1 className="mt-7 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Secure access to your grid operations
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
              Monitor demand, manage routes, react to alerts, and coordinate dispatch decisions across the full energy network.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Real-time performance and load balancing",
                "Operational alerts across routes, customers, and scenarios",
                "Decision support for dispatch and risk planning",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-700/80 bg-slate-800/50 p-3">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-sm text-emerald-300">
                    ✓
                  </span>
                  <p className="text-sm text-slate-200">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">System status</p>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-200">
                <span>North grid loop</span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-300">Stable</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-slate-200">
                <span>Alert queue</span>
                <span className="font-semibold text-amber-300">14 active</span>
              </div>
            </div>
          </div>

          <div className="p-8 lg:p-10">
            <div className="mt-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Sign in
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">Operator access</h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="••••••••"
                />
              </div>

              {error ? (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </p>
              ) : null}

              <div className="flex items-center justify-between text-sm text-slate-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-emerald-500" />
                  Remember me
                </label>
                <Link href="/" className="text-emerald-300 transition hover:text-emerald-200">
                  Need help?
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-xs text-slate-300">
                Demo access: <span className="font-semibold text-emerald-300">operator@energybridge.com</span> / <span className="font-semibold text-emerald-300">password123</span>
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              No account yet? <Link href="/" className="font-medium text-emerald-300 hover:text-emerald-200">View overview</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
