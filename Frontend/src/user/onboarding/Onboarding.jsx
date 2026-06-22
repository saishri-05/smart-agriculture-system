import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, MapPin, Sprout, UserRound, Wheat } from "lucide-react";

const steps = [
  { label: "Farmer Info", icon: UserRound },
  { label: "Farm Details", icon: Wheat },
  { label: "Farm Location", icon: MapPin },
  { label: "Confirmation", icon: Check },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const StepIcon = steps[step].icon;

  return (
    <main className="min-h-screen bg-[#f7faf4] px-4 py-10 text-[#00112b]">
      <section className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="flex items-center justify-center gap-3 text-3xl font-black text-[#287c30] md:text-4xl">
            <Sprout size={42} /> Welcome to Smart Agriculture
          </h1>
          <p className="mt-4 text-lg text-slate-700">Let's set up your first farm</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-4 items-start gap-3">
          {steps.map((item, index) => (
            <div key={item.label} className="text-center">
              <button
                onClick={() => setStep(index)}
                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-black ${
                  index <= step ? "bg-[#287c30] text-white" : "bg-slate-300 text-slate-700"
                }`}
              >
                {index + 1}
              </button>
              <p className="mt-3 text-sm font-semibold text-slate-700">{item.label}</p>
            </div>
          ))}
        </div>

        <section className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center gap-4">
            <span className="rounded-lg bg-green-100 p-4 text-[#287c30]">
              <StepIcon size={38} />
            </span>
            <h2 className="text-3xl font-black text-[#287c30]">{steps[step].label}</h2>
          </div>

          {step === 0 && (
            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block font-black">Farmer Name *</span>
                <input className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]" placeholder="John Doe" />
              </label>
              <label className="block">
                <span className="mb-2 block font-black">Phone Number *</span>
                <input className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]" placeholder="+1 (555) 123-4567" />
              </label>
              <label className="block">
                <span className="mb-2 block font-black">Region / Country *</span>
                <input className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]" placeholder="California, USA" />
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-black">Farm Name *</span>
                <input className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]" placeholder="Green Valley Farm" />
              </label>
              <label className="block">
                <span className="mb-2 block font-black">Farm Area *</span>
                <input className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]" placeholder="18 acres" />
              </label>
              <label className="block">
                <span className="mb-2 block font-black">Main Crop *</span>
                <select className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]">
                  <option>Rice</option>
                  <option>Wheat</option>
                  <option>Corn</option>
                  <option>Tomato</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block font-black">Soil Type *</span>
                <select className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]">
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
                <span className="mb-2 block font-black">Village / City *</span>
                <input className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]" placeholder="Village or city name" />
              </label>
              <label className="block">
                <span className="mb-2 block font-black">Irrigation Method *</span>
                <select className="w-full rounded-lg border border-slate-300 px-5 py-4 text-lg outline-none focus:border-[#287c30]">
                  <option>Drip Irrigation</option>
                  <option>Sprinkler</option>
                  <option>Canal Water</option>
                  <option>Manual Watering</option>
                </select>
              </label>
              <div className="rounded-lg border-2 border-dashed border-[#287c30] bg-green-50 p-8 text-center font-black text-[#287c30]">
                Map location can be added here
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <Check className="mx-auto rounded-full bg-[#287c30] p-4 text-white" size={86} />
              <h2 className="mt-6 text-3xl font-black">Your farm is ready</h2>
              <p className="mx-auto mt-3 max-w-xl text-lg text-slate-700">
                You can now monitor weather, soil, robots, alerts, and crop health from the dashboard.
              </p>
            </div>
          )}
        </section>

        <div className="mx-auto mt-8 flex max-w-4xl justify-between">
          <button
            onClick={() => (step === 0 ? navigate("/dashboard") : setStep(step - 1))}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-300 px-6 py-4 text-lg font-black text-slate-700"
          >
            <ChevronLeft size={22} /> Back
          </button>
          <button
            onClick={() => (step === steps.length - 1 ? navigate("/dashboard") : setStep(step + 1))}
            className="inline-flex items-center gap-2 rounded-lg bg-[#287c30] px-6 py-4 text-lg font-black text-white"
          >
            {step === steps.length - 1 ? "Open Dashboard" : "Next"} <ChevronRight size={22} />
          </button>
        </div>
      </section>
    </main>
  );
}

export default Onboarding;
