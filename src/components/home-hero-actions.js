"use client";

import { useCurrentUser } from "@/lib/current-user-context";

const primaryBtn =
  "inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const secondaryBtn =
  "inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2";

export default function HomeHeroActions() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="mt-8 flex flex-col gap-3 sm:flex-row" aria-busy="true">
        <div className="h-10 w-36 animate-pulse rounded-lg bg-slate-200 sm:w-40" />
        <div className="h-10 w-28 animate-pulse rounded-lg bg-slate-200 sm:w-32" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="/create-job" className={primaryBtn}>
          Create Job
        </a>
        <a href="/jobs" className={secondaryBtn}>
          Jobs
        </a>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <a href="/register" className={primaryBtn}>
        Get Started
      </a>
      <a href="/login" className={secondaryBtn}>
        Sign in
      </a>
    </div>
  );
}
