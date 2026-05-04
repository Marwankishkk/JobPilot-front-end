"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api-base";
import { useCurrentUser } from "@/lib/current-user-context";

function formatApiError(data) {
  if (!data || typeof data !== "object") return null;

  if (typeof data.detail === "string") return data.detail;

  if (Array.isArray(data.detail)) {
    return data.detail
      .map((d) => (typeof d === "object" && d?.msg ? d.msg : String(d)))
      .join(" ");
  }

  if (typeof data.error === "string") return data.error;
  if (typeof data.message === "string") return data.message;

  return null;
}

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white p-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

export default function RegisterForm() {
  const router = useRouter();
  const { user, loading: authLoading } = useCurrentUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const passwordsMatch = password === confirmPassword;

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/");
    }
  }, [authLoading, user, router]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Password and Confirm Password must match.");
      return;
    }

    setError("");
    setSubmitting(true);

    const payload = { username, password };

    try {
      const response = await fetch(apiUrl("/users/register"), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        try {
          data = await response.json();
        } catch {
          // ignore invalid JSON
        }
      }

      if (response.ok) {
        router.push("/login");
        return;
      }

      const errorMessage =
        formatApiError(data) ||
        data?.detail ||
        `Registration failed (${response.status})`;

      setError(errorMessage);
    } catch (e) {
      setError(
        e instanceof TypeError
          ? "Network error — cannot reach API. Check URL and CORS."
          : "Unexpected error occurred."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading) {
    return (
      <p className="text-center text-sm text-slate-500" aria-busy="true">
        Loading…
      </p>
    );
  }

  if (user) {
    return (
      <p className="text-center text-sm text-slate-500">Redirecting…</p>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Username
        </label>
        <input
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (error) setError("");
          }}
          className={inputClass}
          placeholder="Choose a username"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
          className={inputClass}
          placeholder="••••••••"
          required
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (error) setError("");
          }}
          className={`${inputClass} ${
            confirmPassword && !passwordsMatch
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30"
              : ""
          }`}
          placeholder="••••••••"
          required
        />

        {confirmPassword && !passwordsMatch && (
          <p className="text-sm text-rose-600 mt-1">
            Password and Confirm Password do not match.
          </p>
        )}
      </div>

      {/* Error */}
      {error && <p className="text-sm text-rose-600">{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting || !passwordsMatch}
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Creating account…" : "Register"}
      </button>
    </form>
  );
}