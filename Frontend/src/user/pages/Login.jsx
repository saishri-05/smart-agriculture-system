import { useNavigate } from "react-router-dom";
import { Leaf, LogIn, CheckCircle } from "lucide-react";

const features = [
  "Real-time soil & crop monitoring",
  "AI-powered irrigation scheduling",
  "Automated robot fleet management",
  "Weather & pest early warnings",
];

function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/onboarding");
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#0F2440] via-[#1A3A5C] to-[#234F78] flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white" />
          <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] rounded-full bg-[#10B981]" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#10B981] shadow-lg">
              <Leaf size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white/90">Smart Agriculture</span>
          </div>
        </div>

        <div className="relative space-y-8">
          <div>
            <h1 className="text-4xl font-black leading-tight text-white">
              Smart Agriculture
              <br />
              <span className="text-[#10B981]">Platform</span>
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-md leading-relaxed">
              Monitor your crops, optimize irrigation, manage robots, and maximize
              yields — all from one dashboard.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-[#10B981] shrink-0" />
                <span className="text-white/70">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-sm text-white/30">
          &copy; 2026 Smart Agriculture. All rights reserved.
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full max-w-lg">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10B981]">
              <Leaf size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold text-[#111827]">Smart Agriculture</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-[#111827]">Welcome back</h2>
            <p className="mt-2 text-lg text-slate-500">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Email address
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                placeholder="john@farm.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-slate-300 bg-white px-5 py-4 text-base outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-slate-300 text-[#10B981] focus:ring-[#10B981]"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-[#10B981] hover:text-[#059669] transition"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#10B981] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#10B981]/20 transition hover:bg-[#059669] hover:shadow-xl cursor-pointer"
            >
              <LogIn size={22} />
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center">
            <a
              href="/"
              className="text-sm text-slate-400 hover:text-slate-600 transition"
            >
              &larr; Back to home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
