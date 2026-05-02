"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white p-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const passwordsMatch = password === confirmPassword;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!passwordsMatch) {
      setError("Password and Confirm Password must match.");
      return;
    }

    setError("");
    const payload = {
      email: email,
      password: password,
    }
    const response = await fetch("http://localhost:8000/users/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      await response.json();
      router.push("/login");
    } else {
      const data = await response.json();
      setError(data.error);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
          placeholder="••••••••"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            if (error) setError("");
          }}
          placeholder="••••••••"
          className={`${inputClass} ${
            confirmPassword && !passwordsMatch ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30" : ""
          }`}
          required
        />
      </div>

      {confirmPassword && !passwordsMatch && (
        <p className="text-sm text-rose-600">Password and Confirm Password do not match.</p>
      )}

      {error && <p className="text-sm text-rose-600">{error}</p>}

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Register
      </button>
    </form>
  );
}
