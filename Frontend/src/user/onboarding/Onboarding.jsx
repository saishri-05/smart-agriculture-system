import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, MapPin, Sprout, UserRound, Wheat } from "lucide-react";

const steps = [
  { label: "Farmer Info", icon: UserRound },
  { label: "Farm Details", icon: Wheat },
  { label: "Farm Location", icon: MapPin },
  { label: "Confirmation", icon: Check },
];

const inputClass = "w-full rounded-xl border-2 border-[#e8d5f5] bg-white px-6 py-5 text-lg outline-none transition-all duration-200 focus:border-[#c4a3e0] focus:ring-4 focus:ring-[#f0e6f6] placeholder:text-slate-400";
const selectClass = "w-full rounded-xl border-2 border-[#e8d5f5] bg-white px-6 py-5 text-lg outline-none transition-all duration-200 focus:border-[#c4a3e0] focus:ring-4 focus:ring-[#f0e6f6]";

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const StepIcon = steps[step].icon;

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#faf0f6] via-white to-[#f0e6f6] px-6 py-12 text-[#00112b]">
      <section className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] shadow-lg shadow-[#8e6abf]/30">
            <Sprout className="text-white" size={44} />
          </div>
          <h1 className="mt-6 text-4xl font-black text-[#6b4f8a] md:text-5xl">Welcome to Smart Agriculture</h1>
          <p className="mt-3 text-xl text-[#9a8aaa]">Let's set up your first farm</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-4 items-start gap-4">
          {steps.map((item, index) => (
            <div key={item.label} className="text-center">
              <button
                onClick={() => setStep(index)}
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-black shadow-lg transition-all duration-200 ${
                  index <= step
                    ? "bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] text-white shadow-[#8e6abf]/30 hover:scale-110"
                    : "bg-[#ede7f6] text-[#9a8aaa] hover:bg-[#e0d4f0]"
                }`}
              >
                {index + 1}
              </button>
              <p className="mt-3 text-sm font-bold text-[#6b5b7b]">{item.label}</p>
            </div>
          ))}
        </div>

        <section className="mx-auto mt-10 rounded-3xl bg-white/80 p-10 shadow-2xl shadow-[#d1c4e9]/30 backdrop-blur-xl ring-1 ring-[#ede7f6]">
          <div className="mb-8 flex items-center gap-5">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ede7f6] to-[#f0e6f6] text-[#8e6abf] shadow-md">
              <StepIcon size={40} />
            </span>
            <h2 className="text-3xl font-black text-[#8e6abf]">{steps[step].label}</h2>
          </div>

          {step === 0 && (
            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Farmer Name *</span>
                <input className={inputClass} placeholder="John Doe" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Phone Number *</span>
                <input className={inputClass} placeholder="+1 (555) 123-4567" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Region / Country *</span>
                <input className={inputClass} placeholder="California, USA" />
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Farm Name *</span>
                <input className={inputClass} placeholder="Green Valley Farm" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Farm Area *</span>
                <input className={inputClass} placeholder="18 acres" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Main Crop *</span>
                <select className={selectClass}>
                  <option>Rice</option>
                  <option>Wheat</option>
                  <option>Corn</option>
                  <option>Tomato</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Soil Type *</span>
                <select className={selectClass}>
                  <option>Loamy Soil</option>
                  <option>Clay Soil</option>
                  <option>Black Soil</option>
                </select>
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Village / City *</span>
                <input className={inputClass} placeholder="Village or city name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase tracking-wide text-[#8e6abf]">Irrigation Method *</span>
                <select className={selectClass}>
                  <option>Drip Irrigation</option>
                  <option>Sprinkler</option>
                  <option>Canal Water</option>
                  <option>Manual Watering</option>
                </select>
              </label>
              <div className="rounded-2xl border-2 border-dashed border-[#d1c4e9] bg-gradient-to-br from-[#faf0f6] to-[#f0e6f6] p-12 text-center">
                <MapPin className="mx-auto text-[#b39ddb]" size={52} />
                <p className="mt-4 text-xl font-black text-[#8e6abf]">Map location can be added here</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] shadow-xl shadow-[#8e6abf]/30">
                <Check className="text-white" size={60} />
              </div>
              <h2 className="mt-8 text-4xl font-black text-[#6b4f8a]">Your farm is ready</h2>
              <p className="mx-auto mt-4 max-w-xl text-xl text-[#9a8aaa]">
                You can now monitor weather, soil, robots, alerts, and crop health from the dashboard.
              </p>
            </div>
          )}
        </section>

        <div className="mx-auto mt-8 flex max-w-3xl justify-between">
          <button
            onClick={() => (step === 0 ? navigate("/dashboard") : setStep(step - 1))}
            className="inline-flex items-center gap-3 rounded-2xl bg-[#ede7f6] px-8 py-5 text-xl font-black text-[#6b5b7b] shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-[#e0d4f0] hover:shadow-xl active:scale-[0.98]"
          >
            <ChevronLeft size={28} /> Back
          </button>
          <button
            onClick={() => (step === steps.length - 1 ? navigate("/dashboard") : setStep(step + 1))}
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] px-8 py-5 text-xl font-black text-white shadow-lg shadow-[#8e6abf]/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#8e6abf]/40 active:scale-[0.98]"
          >
            {step === steps.length - 1 ? "Open Dashboard" : "Next"} <ChevronRight size={28} />
          </button>
        </div>
      </section>
    </main>
  );
}

export default Onboarding;
