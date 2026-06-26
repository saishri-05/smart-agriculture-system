import { Camera, Key, Mail, Phone, Save, User as UserIcon } from "lucide-react";
import AppShell from "../components/AppShell";

const inputClass = "w-full rounded-2xl border-2 border-[#a8d5a8] bg-white px-6 py-5 text-lg font-bold outline-none transition-all duration-200 focus:border-[#2e7d32] focus:ring-4 focus:ring-[#e8f5e9]";

function UserProfileSettings() {
  return (
    <AppShell>
      <section className="mx-auto max-w-4xl space-y-10">
        <div>
          <h1 className="text-4xl font-black text-[#1f5e1f] md:text-5xl">User Profile</h1>
          <p className="mt-2 text-xl text-[#6b8e6b]">Manage your account settings and profile information</p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-[#a8d5a8]/20 ring-1 ring-[#c8e6c9]">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative">
              <span className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#2e7d32] to-[#66bb6a] text-5xl font-black text-white shadow-lg shadow-[#2e7d32]/30">
                JD
              </span>
              <button className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-[#c8e6c9] transition-all duration-200 hover:scale-110 hover:shadow-lg active:scale-95">
                <Camera size={20} className="text-[#2e7d32]" />
              </button>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-black text-[#1f5e1f]">John Doe</h2>
              <p className="mt-1 text-lg text-[#6b8e6b]">Farm Owner</p>
              <p className="mt-4 rounded-2xl bg-gradient-to-r from-[#e8f5e9] to-[#f1f8e9] px-6 py-3 text-sm font-bold text-[#2e7d32] shadow-inner">
                Member since January 2026
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-[#a8d5a8]/20 ring-1 ring-[#c8e6c9]">
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-black text-[#1f5e1f]">
              <UserIcon size={28} /> Personal Information
            </h2>
            <div className="space-y-6">
              <label>
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#2e7d32]">Full Name</span>
                <input className={inputClass} defaultValue="John Doe" />
              </label>
              <label>
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#2e7d32]">Email</span>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-[#a8d5a8]" size={24} />
                  <input className={`${inputClass} pl-16`} defaultValue="john@example.com" />
                </div>
              </label>
              <label>
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#2e7d32]">Phone</span>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-[#a8d5a8]" size={24} />
                  <input className={`${inputClass} pl-16`} defaultValue="+1 234 567 890" />
                </div>
              </label>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl shadow-[#a8d5a8]/20 ring-1 ring-[#c8e6c9]">
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-black text-[#1f5e1f]">
              <Key size={28} /> Change Password
            </h2>
            <div className="space-y-6">
              <label>
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#2e7d32]">Current Password</span>
                <input className={inputClass} type="password" />
              </label>
              <label>
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#2e7d32]">New Password</span>
                <input className={inputClass} type="password" />
              </label>
              <label>
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#2e7d32]">Confirm New Password</span>
                <input className={inputClass} type="password" />
              </label>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-[#a8d5a8]/20 ring-1 ring-[#c8e6c9]">
          <h2 className="mb-6 text-2xl font-black text-[#1f5e1f]">Preferences</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#2e7d32]">Language</span>
              <select className={inputClass}>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </label>
            <label>
              <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#2e7d32]">Time Zone</span>
              <select className={inputClass}>
                <option>UTC (Coordinated Universal Time)</option>
                <option>EST (Eastern Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </label>
          </div>
          <div className="mt-8 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#e8f5e9] to-[#f1f8e9] p-6 shadow-inner">
            <div>
              <p className="text-xl font-black text-[#1f5e1f]">Email Notifications</p>
              <p className="mt-1 text-sm text-[#6b8e6b]">Receive alerts and updates via email</p>
            </div>
            <label className="relative inline-flex h-8 w-14 cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <span className="absolute inset-0 rounded-full bg-[#a8d5a8] transition-all duration-200 peer-checked:bg-[#2e7d32] peer-focus:ring-4 peer-focus:ring-[#e8f5e9]" />
              <span className="absolute left-1 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-200 peer-checked:translate-x-6" />
            </label>
          </div>
        </div>

        <button className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#2e7d32] to-[#66bb6a] px-10 py-5 text-xl font-black text-white shadow-lg shadow-[#2e7d32]/30 transition-all duration-200 hover:scale-[1.01] hover:shadow-xl active:scale-[0.99]">
          <Save size={28} /> Save Changes
        </button>
      </section>
    </AppShell>
  );
}

export default UserProfileSettings;
