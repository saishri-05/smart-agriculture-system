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
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#083B1B] via-[#1B5E20] to-[#2E7D32] flex-col justify-between p-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white" />
          <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] rounded-full bg-[#4CAF50]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2E7D32] shadow-lg">
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
              <span className="text-[#2E7D32]">Platform</span>
            </h1>
            <p className="mt-4 text-lg text-white/60 max-w-md leading-relaxed">
              Monitor your crops, optimize irrigation, manage robots, and maximize
              yields — all from one dashboard.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-[#2E7D32] shrink-0" />
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2E7D32]">
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
                className="input"
                placeholder="john@farm.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-slate-300 text-[#2E7D32] focus:ring-[#2E7D32]"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-semibold text-[#2E7D32] hover:text-[#256D28] transition"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
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
