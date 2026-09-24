"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearStoredSession, getStoredSession, setStoredSession, type UserSession } from "@/lib/auth";

type AuthContextValue = {
  user: UserSession | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const session = getStoredSession();
    setUser(session);
    setIsReady(true);
  }, []);

  const signIn = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    const validEmail = "operator@energybridge.com";
    const validPassword = "password123";

    if (normalizedEmail !== validEmail || normalizedPassword !== validPassword) {
      return false;
    }

    const nextUser = {
      email: normalizedEmail,
      name: "Operations Lead",
    };

    setStoredSession(nextUser);
    setUser(nextUser);
    return true;
  }, []);

  const signOut = useCallback(() => {
    clearStoredSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
    }),
    [signIn, signOut, user],
  );

  if (!isReady) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
