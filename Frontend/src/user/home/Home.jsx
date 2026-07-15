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
import heroImage from "../../assets/mycrop.jpg";

const features = [
  { icon: BarChart3, title: "Real-time Farm Monitoring", text: "Monitor your farm conditions 24/7 with live sensor data." },
  { icon: Bot, title: "IoT Robot Data Collection", text: "Automated data gathering across your entire farm." },
  { icon: Brain, title: "AI Crop Recommendations", text: "Get intelligent insights for optimal crop growth." },
  { icon: Droplets, title: "Smart Irrigation", text: "Save water by irrigating only when your soil needs it." },
  { icon: CloudSun, title: "Weather Insights", text: "Know rain, wind, and temperature before planning work." },
  { icon: ShieldAlert, title: "Simple Alerts", text: "Receive clear warnings for water, crop, and robot issues." },
];

function Home() {
  return (
    <main className="min-h-screen text-[#2d2d2d]">
      <header className="sticky top-0 z-20 border-b border-white/30 glass-navbar">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 text-2xl font-black text-[#111827]">
            <Sprout size={36} />
            <span>🌾 Smart Agriculture</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="btn btn-primary"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="btn btn-ghost"
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:py-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(46,125,50,0.12)] px-5 py-2 text-base font-bold text-[#2E7D32]">
            <Leaf size={20} /> Smart Farming Made Simple
          </span>
          <h1 className="mt-6 max-w-2xl text-5xl font-black leading-tight text-[#111827] md:text-7xl">
            Smarter Farming <br />with IoT &amp; AI
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-9 text-[#5A7A5A]">
            Monitor your crops, water, soil, and robots from one simple dashboard. Built for farmers who want better yields with less effort.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="btn btn-primary"
            >
              Sign In <ArrowRight size={24} />
            </Link>
            <Link
              to="/dashboard"
              className="btn btn-ghost"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <img src={heroImage} alt="Golden wheat farm field" className="h-[26rem] w-full object-cover lg:h-[28rem]" />
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-black text-[#111827] md:text-5xl">What You Get</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-xl text-[#5A7A5A]">
            Everything you need to manage your farm from one place.
          </p>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <article key={f.title} className="glass-card p-8 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
                <span className="inline-flex rounded-xl bg-[#2E7D32] p-4 text-white shadow-sm">
                  <f.icon size={36} />
                </span>
                <h3 className="mt-6 text-2xl font-black text-[#111827]">{f.title}</h3>
                <p className="mt-3 text-lg leading-7 text-[#5A7A5A]">{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#2E7D32] to-[#256D28] px-6 py-20 text-center text-white">
        <Sprout className="mx-auto" size={64} />
        <h2 className="mt-6 text-4xl font-black md:text-5xl">Ready to farm smarter?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-white/80">
          Join farmers using smart technology to grow more with less.
        </p>
        <Link
          to="/login"
          className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-9 py-4 text-sm font-semibold text-[#2E7D32] shadow-lg transition hover:bg-[rgba(46,125,50,0.06)]"
        >
          Start Now <ArrowRight size={24} />
        </Link>
      </section>
    </main>
  );
}

export default Home;
