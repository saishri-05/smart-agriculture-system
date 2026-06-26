import { Link, useNavigate } from "react-router-dom";
import { Leaf, LogIn } from "lucide-react";

const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-5 py-4 text-lg outline-none focus:border-[#10B981]";

function Login() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="w-full max-w-md glass-card p-10">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-[#10B981] shadow-md">
            <LogIn className="text-white" size={40} />
          </div>
          <h1 className="mt-6 text-4xl font-black text-[#111827]">Welcome Back</h1>
          <p className="mt-2 text-lg text-slate-600">Sign in to your Smart Agriculture dashboard</p>
        </div>

        <form className="mt-10 space-y-5" onSubmit={(e) => { e.preventDefault(); navigate("/onboarding"); }}>
          <label className="block">
            <span className="mb-2 block text-sm font-black uppercase tracking-wide text-slate-700">Email</span>
            <input type="email" className={inputClass} placeholder="john@farm.com" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black uppercase tracking-wide text-slate-700">Password</span>
            <input type="password" className={inputClass} placeholder="••••••••" />
          </label>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-3">
              <input type="checkbox" className="h-5 w-5 accent-[#10B981]" />
              <span className="text-slate-600">Remember me</span>
            </label>
            <a href="#" className="font-bold text-slate-500 transition hover:text-[#10B981]">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#10B981] px-10 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-[#059669]"
          >
            <Leaf size={24} /> Sign In
          </button>
        </form>

        <p className="mt-8 text-center">
          <Link to="/" className="font-semibold text-slate-600 transition hover:text-[#10B981]">← Back to Home</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
