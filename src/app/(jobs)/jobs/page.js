import Navbar from "@/components/navbar";
import JobsTable from "@/components/jobs-table";
export default function JobsPage() {
    return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Jobs
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Track your applications and pipeline.
            </p>
          </div>
          <a
            href="/create-job"
            className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto sm:min-h-0"
          >
            Create job
          </a>
        </div>
        <JobsTable />
      </div>
    </div>
  );
}