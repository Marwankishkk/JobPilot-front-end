import Navbar from "@/components/navbar";
import ForgotPasswordForm from "@/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex items-center justify-center py-10">
        <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-md">
          <h1 className="mb-6 text-center text-2xl font-bold tracking-tight text-slate-900">
            Forgot password
          </h1>

          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
