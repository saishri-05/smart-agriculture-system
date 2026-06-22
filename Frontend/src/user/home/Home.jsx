import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  CloudSun,
  Droplets,
  Leaf,
  ShieldAlert,
  Sprout,
} from "lucide-react";
import heroImage from "../../assets/hero.png";

const features = [
  { icon: BarChart3, title: "Real-time Farm Monitoring", text: "Monitor your farm conditions 24/7 with live sensor data." },
  { icon: Bot, title: "IoT Robot Data Collection", text: "Automated data gathering across your entire farm." },
  { icon: Brain, title: "AI Crop Recommendations", text: "Get intelligent insights for optimal crop growth." },
  { icon: Droplets, title: "Smart Irrigation", text: "Save water by irrigating only when your soil needs it." },
  { icon: CloudSun, title: "Weather Insights", text: "Know rain, wind, and temperature before planning work." },
  { icon: ShieldAlert, title: "Simple Alerts", text: "Receive clear warnings for water, crop, and robot issues." },
];

const btnPrimary = "rounded-2xl bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] px-10 py-5 text-xl font-black text-white shadow-lg shadow-[#8e6abf]/30 transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-[#8e6abf]/40 active:scale-[0.97]";
const btnOutline = "rounded-2xl border-2 border-[#8e6abf] px-10 py-5 text-xl font-black text-[#8e6abf] shadow-lg transition-all duration-200 hover:scale-[1.03] hover:bg-[#fce4ec] hover:shadow-xl active:scale-[0.97]";

function Home() {
  return (
    <main className="min-h-screen bg-[#faf0f6] text-[#2d2d2d]">
      <header className="sticky top-0 z-20 border-b border-[#d1c4e9] bg-white/80 shadow-lg shadow-[#d1c4e9]/10 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <Link to="/" className="flex items-center gap-4 text-3xl font-black text-[#8e6abf]">
            <Sprout size={44} />
            <span>🌾 SmartAgri</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link to="/register" className={btnPrimary}>Get Started</Link>
            <Link to="/login" className={btnOutline}>Sign In</Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-16 px-8 py-32 lg:grid-cols-2 lg:py-40">
        <div>
          <span className="inline-flex items-center gap-3 rounded-full bg-[#ede7f6] px-6 py-3 text-lg font-bold text-[#8e6abf] shadow-sm">
            <Leaf size={24} /> Smart Farming Made Simple
          </span>
          <h1 className="mt-8 max-w-2xl text-6xl font-black leading-tight text-[#5a3d7a] md:text-8xl">
            Smarter Farming <br />with IoT &amp; AI
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-9 text-[#6b5b7b]">
            Monitor your crops, water, soil, and robots from one simple dashboard. Built for farmers who want better yields with less effort.
          </p>
          <div className="mt-12 flex flex-wrap gap-6">
            <Link to="/register" className={`${btnPrimary} gap-4`}>
              Get Started <ArrowRight size={28} />
            </Link>
            <Link to="/login" className={btnOutline}>Sign In</Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-[#d1c4e9]/40 ring-1 ring-[#ede7f6]">
          <img src={heroImage} alt="Golden wheat farm field" className="h-[30rem] w-full object-cover transition duration-500 hover:scale-105 lg:h-[34rem]" />
        </div>
      </section>

      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-8">
          <h2 className="text-center text-5xl font-black text-[#8e6abf] md:text-6xl">What You Get</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-xl text-[#6b5b7b]">
            Everything you need to manage your farm from one place.
          </p>
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <article key={f.title} className="group rounded-3xl border-2 border-[#ede7f6] bg-[#faf0f6] p-10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#d1c4e9] hover:shadow-2xl hover:shadow-[#d1c4e9]/20">
                <span className="inline-flex rounded-2xl bg-gradient-to-br from-[#8e6abf] to-[#b39ddb] p-5 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[#8e6abf]/30">
                  <f.icon size={44} />
                </span>
                <h3 className="mt-8 text-3xl font-black text-[#8e6abf]">{f.title}</h3>
                <p className="mt-4 text-lg leading-8 text-[#6b5b7b]">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#8e6abf] via-[#a07ccf] to-[#b39ddb] px-8 py-28 text-center text-white">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur shadow-lg">
          <Sprout size={56} />
        </div>
        <h2 className="mt-8 text-5xl font-black md:text-6xl">Ready to farm smarter?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-purple-100">
          Join farmers using smart technology to grow more with less.
        </p>
        <Link
          to="/register"
          className="mt-10 inline-flex items-center gap-4 rounded-2xl bg-white px-12 py-5 text-xl font-black text-[#8e6abf] shadow-xl transition-all duration-200 hover:scale-[1.03] hover:bg-pink-50 hover:shadow-2xl active:scale-[0.97]"
        >
          Start Now <ArrowRight size={28} />
        </Link>
      </section>
    </main>
  );
}

export default Home;
