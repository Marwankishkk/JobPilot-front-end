import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import RegisterForm from "@/components/register-form";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const cookieStore = await cookies();
   const isAuthenticated = cookieStore.get("token") !== undefined;

  if (isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
  
    <Navbar />
  
    <div className="flex items-center justify-center py-10">
      
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">
  
        <h1 className="mb-6 text-center text-2xl font-bold tracking-tight text-slate-900">
          Register
        </h1>
  
        <RegisterForm />
  
      </div>
    </div>
  </div>
  );
}