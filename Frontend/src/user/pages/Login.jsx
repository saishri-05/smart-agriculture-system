import { Link } from "react-router-dom";
import { Leaf, LogIn, Sprout } from "lucide-react";

const inputClass = "w-full rounded-xl border-2 border-[#e8d5f5] bg-white px-6 py-5 text-lg outline-none transition-all duration-200 focus:border-[#c4a3e0] focus:ring-4 focus:ring-[#f0e6f6] placeholder:text-slate-400";

function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#faf0f6] via-white to-[#f0e6f6] px-4">
      <section className="w-full max-w-md rounded-3xl bg-white/80 p-10 shadow-2xl shadow-[#d1c4e9]/40 backdrop-blur-xl ring-1 ring-[#e8d5f5]">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] shadow-lg shadow-[#8e6abf]/30">
            <LogIn className="text-white" size={40} />
          </div>
          <h1 className="mt-6 text-4xl font-black text-[#6b4f8a]">Welcome Back</h1>
          <p className="mt-2 text-lg text-[#9a8aaa]">Sign in to your SmartAgri dashboard</p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Email</span>
            <input type="email" className={inputClass} placeholder="john@farm.com" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Password</span>
            <input type="password" className={inputClass} placeholder="••••••••" />
          </label>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-3">
              <input type="checkbox" className="h-5 w-5 accent-[#8e6abf]" />
              <span className="text-slate-600">Remember me</span>
            </label>
            <a href="#" className="font-bold text-[#b39ddb] transition hover:text-[#8e6abf] hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] px-10 py-5 text-xl font-black text-white shadow-lg shadow-[#8e6abf]/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#8e6abf]/40 active:scale-[0.98]"
          >
            <Leaf size={26} /> Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-lg text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-black text-[#8e6abf] transition hover:text-[#7b55a8] hover:underline">Register</Link>
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="font-semibold text-[#b39ddb] transition hover:text-[#8e6abf] hover:underline">← Back to Home</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
