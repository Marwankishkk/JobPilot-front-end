"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/apiFetch";
import { apiUrl } from "@/lib/api-base";

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white p-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

export default function CreateJobForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const trimmedDesc = description.trim();

    const payload = {
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      status,
      description: trimmedDesc.length > 0 ? trimmedDesc.slice(0, 1000) : null,
      applied_date: appliedDate ? appliedDate : null,
    };

    try {
      const response = await apiFetch(apiUrl("/jobs"), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/jobs");
        return;
      }

      const data = await response.json().catch(() => ({}));
      const detail =
        typeof data.detail === "string"
          ? data.detail
          : Array.isArray(data.detail)
            ? data.detail[0]?.msg
            : undefined;
      setError(data.error ?? detail ?? "Could not create job.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Job Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          required
          minLength={1}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Company
        </label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
          required
          minLength={1}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Job Description{" "}
          <span className="font-normal text-slate-500">(optional, max 1000)</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          maxLength={1000}
          className={inputClass}
          placeholder="Notes about the role…"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Location
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={inputClass}
          required
          minLength={1}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={inputClass}
        >
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Applied date{" "}
          <span className="font-normal text-slate-500">(optional)</span>
        </label>
        <input
          type="date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
          className={inputClass}
        />
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"
      >
        {submitting ? "Creating…" : "Create Job"}
      </button>
    </form>
  );
}
