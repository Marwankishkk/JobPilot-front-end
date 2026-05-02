"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "@/lib/apiFetch";
import { apiUrl } from "@/lib/api-base";

const ME_URL = apiUrl("/users/me");

const CurrentUserContext = createContext(null);

async function fetchMe() {
  const res = await apiFetch(ME_URL, {
    credentials: "include",
  });
  if (res.ok) {
    return await res.json();
  }
  return null;
}

export function CurrentUserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const next = await fetchMe();
      setUser(next);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      try {
        const next = await fetchMe();
        if (cancelled) return;
        setUser(next);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadUser();
    return () => {
      cancelled = true;
    };
  }, []);

  const clearUser = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, loading, clearUser, refreshUser }),
    [user, loading, clearUser, refreshUser]
  );

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const ctx = useContext(CurrentUserContext);
  if (!ctx) {
    throw new Error("useCurrentUser must be used within CurrentUserProvider");
  }
  return ctx;
}
