"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/current-user-context";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, clearUser } = useCurrentUser();

  async function handleLogout() {
    await fetch("http://localhost:8000/users/logout", {
      method: "POST",
      credentials: "include",
    });
    clearUser();
    router.push("/login");
    router.refresh();
  }

  const isAuthenticated = !!user;

  const linkClass =
    "rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900";

  return (
    <header className="border-b border-slate-200/80 bg-white shadow-sm">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          JobPilot
        </a>

        <ul className="flex items-center gap-1 sm:gap-2">
          {loading ? (
            <li className="px-3 py-2 text-sm text-slate-400" aria-hidden>
              …
            </li>
          ) : isAuthenticated ? (
            <>
              <li>
                <a href="/jobs" className={linkClass}>
                  Jobs
                </a>
              </li>
             
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-md px-3 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50 hover:text-rose-800"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/register" className={linkClass}>
                  Register
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                >
                  Login
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
