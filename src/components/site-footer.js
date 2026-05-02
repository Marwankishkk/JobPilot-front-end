export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-6 text-center sm:flex-row sm:gap-2 sm:px-6 lg:px-8">
        <p className="text-xs text-slate-500">
          Created by{" "}
          <span className="font-medium text-slate-700">Marwan Kishk</span>
        </p>
        <span className="hidden text-slate-300 sm:inline" aria-hidden>
          ·
        </span>
        <a
          href="mailto:kishkmarwan49@gmail.com"
          className="text-xs font-medium text-slate-600 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-400"
        >
          kishkmarwan49@gmail.com
        </a>
      </div>
    </footer>
  );
}
