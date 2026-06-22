import { Link } from "react-router-dom";
import { Sprout, UserPlus } from "lucide-react";

const inputClass = "w-full rounded-xl border-2 border-[#f0d6e8] bg-white px-6 py-5 text-lg outline-none transition-all duration-200 focus:border-[#e0a8c8] focus:ring-4 focus:ring-[#fce4ec] placeholder:text-slate-400";

function Register() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#fce4ec] via-white to-[#faf0f6] px-4">
      <section className="w-full max-w-md rounded-3xl bg-white/80 p-10 shadow-2xl shadow-[#f8bbd0]/30 backdrop-blur-xl ring-1 ring-[#f0d6e8]">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f48fb1] to-[#f8bbd0] shadow-lg shadow-[#f48fb1]/30">
            <UserPlus className="text-white" size={40} />
          </div>
          <h1 className="mt-6 text-4xl font-black text-[#8e6abf]">Create Account</h1>
          <p className="mt-2 text-lg text-[#9a8aaa]">Join SmartAgri and start smart farming</p>
        </div>

        <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#f48fb1]">Full Name</span>
            <input type="text" className={inputClass} placeholder="John Doe" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#f48fb1]">Email</span>
            <input type="email" className={inputClass} placeholder="john@farm.com" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#f48fb1]">Password</span>
            <input type="password" className={inputClass} placeholder="••••••••" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#f48fb1]">Confirm Password</span>
            <input type="password" className={inputClass} placeholder="••••••••" />
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#f48fb1] to-[#f8bbd0] px-10 py-5 text-xl font-black text-white shadow-lg shadow-[#f48fb1]/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#f48fb1]/40 active:scale-[0.98]"
          >
            Create Account <UserPlus size={26} />
          </button>
        </form>

        <p className="mt-8 text-center text-lg text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-black text-[#f48fb1] transition hover:text-[#e06090] hover:underline">Sign In</Link>
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="font-semibold text-[#b39ddb] transition hover:text-[#8e6abf] hover:underline">← Back to Home</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
