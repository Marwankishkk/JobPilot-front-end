"use client";

import { useState } from "react";
import Link from "next/link";
import { apiUrl } from "@/lib/api-base";

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white p-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

function formatDetail(detail) {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail[0]?.msg) {
    return detail.map((d) => d.msg).join(" ");
  }
  return "Something went wrong";
}

export default function ForgotPasswordForm() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const passwordsMatch = newPassword === confirmPassword;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setInfoMessage("");
    setPasswordReset(false);

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation must match.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(apiUrl("/users/forgot-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          new_password: newPassword,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          formatDetail(data.detail) || data.message || "Request failed"
        );
        return;
      }

      const msg =
        typeof data.message === "string" ? data.message : "";
      setInfoMessage(msg);

      const reset =
        msg.toLowerCase().includes("password reset") ||
        msg.toLowerCase().includes("password has been reset");
      setPasswordReset(reset);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const formLocked = passwordReset;

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Username
          </label>
          <input
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
            placeholder="Your username"
            required
            disabled={formLocked}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            New password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
            required
            disabled={formLocked}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Confirm new password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`${inputClass} ${
              confirmPassword && !passwordsMatch
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30"
                : ""
            }`}
            placeholder="••••••••"
            required
            disabled={formLocked}
          />
          {confirmPassword && !passwordsMatch && (
            <p className="mt-1 text-sm text-rose-600">
              Passwords do not match.
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm font-medium text-rose-600">{error}</p>
        )}

        {infoMessage && (
          <p
            className={`text-sm ${
              passwordReset ? "font-medium text-emerald-700" : "text-slate-600"
            }`}
          >
            {infoMessage}
          </p>
        )}

        {passwordReset && (
          <p>
            <Link
              href="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Go to login
            </Link>
          </p>
        )}

        <button
          type="submit"
          disabled={formLocked || submitting || !passwordsMatch}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
        >
          {submitting ? "Updating…" : formLocked ? "Done" : "Reset password"}
        </button>
      </form>
    </div>
  );
}
