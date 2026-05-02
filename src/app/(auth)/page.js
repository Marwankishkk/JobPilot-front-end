export default function Home() {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="min-h-screen bg-gray-50">
  
  <Navbar />

  <div className="flex items-center justify-center py-10">
    
    <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md">

      <h1 className="text-2xl font-bold text-center mb-6">
        Register
      </h1>

      <form className="space-y-4">

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-slate-300 p-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-white font-medium hover:bg-blue-700"
        >
          aaaaaa
        </button>

      </form>

    </div>
  </div>
</div>
      </main>
    );
  }