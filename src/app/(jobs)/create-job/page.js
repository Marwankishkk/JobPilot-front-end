import Navbar from "@/components/navbar";
import CreateJobForm from "@/components/create-job-form";
export default function CreateJobPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex items-center justify-center py-10">
                <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">
                    <h1 className="mb-6 text-center text-2xl font-bold tracking-tight text-slate-900">
                        Create Job
                    </h1>
                    <CreateJobForm />
                </div>
            </div>
        </div>
    );
}