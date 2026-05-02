import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

    <Navbar />
  
    <main className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
  
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
  
        {/* Badge */}
        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
          Job Search Tracker
        </span>
  
        {/* Title */}
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Track every application with confidence.
        </h1>
  
        {/* Description */}
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
          Keep your job hunt organized in one place. Save applications, monitor statuses, and stay focused on your next opportunity.
        </p>
  
        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
  
          <a
            href="/register"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Get Started
          </a>

          <a
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            Open Dashboard
          </a>
  
        </div>
  
      </div>
  
    </main>
  
  </div>
  );
}
