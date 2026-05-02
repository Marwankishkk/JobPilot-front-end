"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api-base";

function ResetPasswordForm() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");

    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        apiUrl("/users/reset-password"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Reset failed");
      }

      setStatus("success");

      // redirect بعد النجاح
      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (err) {
      setError(err.message);
      setStatus("failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="space-y-4 w-full max-w-sm" onSubmit={handleResetPassword}>
        
        <h2 className="text-lg font-semibold text-center">
          Reset Password
        </h2>

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 w-full border p-2 rounded"
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {status === "success" && (
          <p className="text-green-600 text-sm">
            Password updated successfully
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-slate-600">
          Loading…
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}