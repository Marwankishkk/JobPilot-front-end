import Navbar from "@/components/navbar";
import HomeHeroActions from "@/components/home-hero-actions";

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
  
        <HomeHeroActions />
  
      </div>
  
    </main>
  
  </div>
  );
}
