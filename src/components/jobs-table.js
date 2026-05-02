"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiFetch";
import { apiUrl } from "@/lib/api-base";

const JOBS_URL = apiUrl("/jobs/");

const STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interviewing" },
  { value: "offered", label: "Offered" },
  { value: "rejected", label: "Rejected" },
];

const statusSelectClass =
  "max-w-full min-w-[8.5rem] rounded-lg border border-slate-200 bg-white py-1.5 pl-2 pr-8 text-xs font-semibold uppercase tracking-wide text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60";

function normalizeStatusForSelect(status) {
  const raw = String(status ?? "").toLowerCase();
  const allowed = new Set(STATUS_OPTIONS.map((o) => o.value));
  return allowed.has(raw) ? raw : "applied";
}

function StatusSelect({ value, disabled, onChange }) {
  const v = normalizeStatusForSelect(value);

  return (
    <select
      aria-label="Job status"
      className={statusSelectClass}
      value={v}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function JobCard({ job, statusSaving, onStatusChange, onDelete }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Role
          </p>
          <p className="mt-0.5 break-words text-base font-semibold leading-snug text-slate-900">
            {job.title ?? "—"}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Company
            </p>
            <p className="mt-0.5 break-words text-sm text-slate-800">
              {job.company ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Location
            </p>
            <p className="mt-0.5 break-words text-sm text-slate-600">
              {job.location ?? "—"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Status
            </p>
            <div className="mt-1.5">
              <StatusSelect
                value={job.status}
                disabled={statusSaving}
                onChange={(next) => onStatusChange(job.id, next)}
              />
            </div>
          </div>
          <div className="flex w-full min-w-0 flex-wrap gap-2 sm:w-auto sm:justify-end">
            <button
              type="button"
              onClick={() => onDelete(job.id)}
              className="min-h-[44px] flex-1 rounded-lg bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100 sm:flex-none sm:min-h-0 sm:py-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

const thClass =
  "px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 lg:px-4";
const tdClass =
  "max-w-0 px-3 py-3 text-sm text-slate-800 lg:max-w-none lg:px-4";
const tdMuted = `${tdClass} text-slate-600`;

export default function JobsTable() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [statusSavingId, setStatusSavingId] = useState(null);

  async function handleUpdateStatus(jobId, status) {
    setStatusSavingId(jobId);
    setActionError(null);
    try {
      const response = await apiFetch(`${JOBS_URL}${jobId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const detail =
          typeof data.detail === "string"
            ? data.detail
            : Array.isArray(data.detail)
              ? data.detail[0]?.msg
              : undefined;
        throw new Error(detail ?? "Could not update status.");
      }

      const updated = await response.json().catch(() => null);
      setJobs((prev) =>
        prev.map((j) => {
          if (j.id !== jobId) return j;
          if (updated && typeof updated === "object") {
            return { ...j, ...updated };
          }
          return { ...j, status };
        })
      );
    } catch (err) {
      setActionError(err.message ?? "Something went wrong");
    } finally {
      setStatusSavingId(null);
    }
  }

  async function handleDelete(id) {
    setActionError(null);
    try {
      const response = await apiFetch(`${JOBS_URL}${id}`, {
        method: "DELETE",
        credentials: "include",
      });
  
      if (response.status !== 204) {
        throw new Error("Failed to delete job");
      }

      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      setActionError(err.message ?? "Something went wrong");
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function fetchJobs() {
      setLoadError(null);
      try {
        const response = await apiFetch(JOBS_URL, { credentials: "include" });
        if (cancelled) return;
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setLoadError(err.message ?? "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchJobs();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <>
        <div className="space-y-3 md:hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="h-5 w-3/4 rounded bg-slate-100" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="h-4 rounded bg-slate-100" />
                <div className="h-4 rounded bg-slate-100" />
              </div>
              <div className="mt-4 flex justify-between border-t border-slate-100 pt-4">
                <div className="h-8 w-24 rounded-full bg-slate-100" />
                <div className="flex gap-2">
                  <div className="h-11 flex-1 rounded-lg bg-slate-100 sm:h-9 sm:w-20 sm:flex-none" />
                  <div className="h-11 flex-1 rounded-lg bg-slate-100 sm:h-9 sm:w-20 sm:flex-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
          <div className="animate-pulse divide-y divide-slate-100">
            <div className="h-11 bg-slate-50" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 px-4 py-3">
                <div className="h-4 flex-1 rounded bg-slate-100" />
                <div className="h-4 w-28 rounded bg-slate-100" />
                <div className="hidden h-4 w-28 rounded bg-slate-100 lg:block" />
                <div className="h-6 w-24 rounded-full bg-slate-100" />
                <div className="h-9 w-36 rounded-lg bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (loadError) {
    return (
      <div
        className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
        role="alert"
      >
        {loadError}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-12 text-center sm:px-6">
        <p className="text-sm font-medium text-slate-700">No jobs yet</p>
        <p className="mt-1 text-sm text-slate-500">
          Create one from the Create Job page.
        </p>
        <a
          href="/create-job"
          className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          Create job
        </a>
      </div>
    );
  }

  return (
    <>
      {actionError && (
        <div
          className="mb-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
          role="alert"
        >
          {actionError}
        </div>
      )}
      {/* Phone / small tablet: stacked cards */}
      <div className="space-y-3 md:hidden">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            statusSaving={statusSavingId === job.id}
            onStatusChange={handleUpdateStatus}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* md+: table */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
          <table className="min-w-[640px] w-full table-fixed divide-y divide-slate-200 lg:min-w-0 lg:table-auto">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th scope="col" className={`${thClass} w-[28%]`}>
                  Title
                </th>
                <th scope="col" className={`${thClass} w-[18%]`}>
                  Company
                </th>
                <th scope="col" className={`${thClass} hidden w-[18%] lg:table-cell`}>
                  Location
                </th>
                <th scope="col" className={`${thClass} w-[14%]`}>
                  Status
                </th>
                <th scope="col" className={`${thClass} w-[22%] text-right`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="transition-colors hover:bg-slate-50/90"
                >
                  <td className={`${tdClass} font-medium text-slate-900`}>
                    <span className="line-clamp-2 break-words lg:line-clamp-none">
                      {job.title ?? "—"}
                    </span>
                    <span className="mt-1 block text-xs font-normal text-slate-500 lg:hidden">
                      {job.location ?? "—"}
                    </span>
                  </td>
                  <td className={`${tdMuted} truncate`}>{job.company ?? "—"}</td>
                  <td className={`${tdMuted} hidden truncate lg:table-cell`}>
                    {job.location ?? "—"}
                  </td>
                  <td className={`${tdClass} align-middle`}>
                    <StatusSelect
                      value={job.status}
                      disabled={statusSavingId === job.id}
                      onChange={(next) => handleUpdateStatus(job.id, next)}
                    />
                  </td>
                  <td className={`${tdClass} align-middle text-right`}>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                     
                      <button
                        type="button"
                        onClick={() => handleDelete(job.id)}
                        className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
