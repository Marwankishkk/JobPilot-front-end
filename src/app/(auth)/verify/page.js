"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiUrl } from "@/lib/api-base";

export default function VerifyPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(
          `${apiUrl("/users/verify")}?token=${encodeURIComponent(token)}`,
          { credentials: "include" }
        );

        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        setStatus("failed");
      }
    }

    verify();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-xl border p-6 shadow-md text-center w-[400px]">
        
        {status === "loading" && (
          <p className="text-gray-600">Verifying your account...</p>
        )}

        {status === "success" && (
          <>
            <h1 className="text-green-600 text-xl font-bold">
              Account Verified 🎉
            </h1>
            <p className="mt-2 text-gray-600">
              You can now log in to your account.
            </p>

            <a
              href="/login"
              className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
            >
              Go to Login
            </a>
          </>
        )}

        {status === "failed" && (
          <>
            <h1 className="text-red-600 text-xl font-bold">
              Verification Failed
            </h1>
            <p className="mt-2 text-gray-600">
              The link is invalid or expired.
            </p>
          </>
        )}

        {status === "invalid" && (
          <>
            <h1 className="text-red-600 text-xl font-bold">
              Missing Token
            </h1>
          </>
        )}

      </div>
    </div>
  );
}