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
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch(
        apiUrl("/users/forgot-password"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(formatDetail(data.detail) || "Request failed");
        return;
      }

      setSent(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@example.com"
            required
            disabled={sent}
          />
        </div>

        {error && (
          <p className="text-sm font-medium text-rose-600">{error}</p>
        )}

        {sent && (
          <p className="text-sm text-slate-600">
            If an account exists for that email, you will receive a link to
            reset your password.
          </p>
        )}

        <button
          type="submit"
          disabled={sent || submitting}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
        >
          {submitting ? "Sending…" : sent ? "Email sent" : "Send reset link"}
        </button>
      </form>

     
    </div>
  );
}
