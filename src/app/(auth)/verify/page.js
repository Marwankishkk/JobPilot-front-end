import { Suspense } from "react";
import VerifyContent from "./verify-content";

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-slate-600">
          Loading…
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
