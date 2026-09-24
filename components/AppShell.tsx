"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useAuth } from "@/components/AuthProvider";

const publicRoutes = ["/", "/login"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isPublicRoute && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);

  if (pathname === "/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
