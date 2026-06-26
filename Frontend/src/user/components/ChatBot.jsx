import { Brain, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

const suggestions = [
  "What should I water today?",
  "Any disease risks?",
  "When to harvest?",
  "Fertilizer advice",
  "Weather impact on crops",
];

const responses = {
  "What should I water today?": {
    text: "Water Sector A at Green Valley Farm for 20 minutes today. Soil moisture is at 42%, below the optimal 60% threshold. Sector C is fine for now.",
    followUps: ["How about fertilizer?", "Check soil pH", "Irrigation schedule"],
  },
  "Any disease risks?": {
    text: "Yes — humidity levels are at 78%, which creates favorable conditions for leaf blast and fungal infections. Inspect Sector C leaves for early signs. Consider applying fungicide as a preventive measure.",
    followUps: ["Which fungicide to use?", "Weather forecast", "Affected areas?"],
  },
  "When to harvest?": {
    text: "Our ML model predicts optimal harvest window for rice crop is October 25–30. Current growth stage is grain filling. Start preparing equipment by October 20.",
    followUps: ["Yield prediction?", "Storage tips", "Market prices"],
  },
  "Fertilizer advice": {
    text: "Apply nitrogen-rich fertilizer to rice crop within the next 2 days. NPK levels are at 45, and a boost will significantly improve yield. Recommend 50kg/acre of urea.",
    followUps: ["When to apply?", "Organic alternatives", "Cost estimate"],
  },
  "Weather impact on crops": {
    text: "Rain expected tomorrow with 25% chance. Avoid pesticide spraying today evening. Temperature will remain around 24°C, which is ideal for rice growth this week.",
    followUps: ["Weekly forecast", "Irrigation plan", "Storm alerts"],
  },
  default: {
    text: "I can help with watering advice, disease detection, fertilizer schedules, harvest timing, and weather impacts on your farm. What would you like to know?",
    followUps: suggestions,
  },
};

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: `Hi! I'm your AI farming assistant. Ask me anything about your crops, weather, or recommendations.` },
  ]);
  const [input, setInput] = useState("");

  function addMessage(role, text) {
    setMessages((prev) => [...prev, { role, text }]);
  }

  function handleSend(text) {
    const q = text.trim();
    if (!q) return;
    addMessage("user", q);
    const res = responses[q] || responses.default;
    setTimeout(() => {
      addMessage("bot", res.text);
    }, 400);
    setInput("");
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-96 flex-col rounded-3xl bg-white shadow-2xl shadow-[#8e6abf]/20 ring-1 ring-[#ede7f6]">
          <div className="flex items-center justify-between rounded-t-3xl bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] px-6 py-5 text-white">
            <div className="flex items-center gap-3">
              <Brain size={28} />
              <div>
                <p className="text-lg font-black">AI Assistant</p>
                <p className="text-sm text-purple-200">Online • Farming Expert</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-xl bg-white/15 p-2 transition-all hover:bg-white/25">
              <X size={20} />
            </button>
          </div>

          <div className="flex h-96 flex-col gap-4 overflow-y-auto p-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 text-base font-semibold leading-7 shadow-md ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] text-white"
                      : "bg-gradient-to-r from-[#faf0f6] to-[#f5f0fa] text-[#6b5b7b]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {messages.length < 4 && (
            <div className="flex flex-wrap gap-2 px-6 pb-4">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="rounded-xl border-2 border-[#ede7f6] bg-[#faf0f6] px-4 py-2 text-sm font-bold text-[#7b55a8] transition-all hover:border-[#8e6abf] hover:bg-[#f0e6f6]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 border-t-2 border-[#ede7f6] p-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask a farming question..."
              className="flex-1 rounded-2xl border-2 border-[#ede7f6] bg-[#faf0f6] px-5 py-4 text-base font-semibold outline-none transition-all focus:border-[#8e6abf] focus:ring-4 focus:ring-[#f0e6f6]"
            />
            <button
              onClick={() => handleSend(input)}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] text-white shadow-lg shadow-[#8e6abf]/30 transition-all hover:scale-105 active:scale-95"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#8e6abf] to-[#b39ddb] text-white shadow-2xl shadow-[#8e6abf]/40 transition-all hover:scale-110 active:scale-90"
      >
        {open ? <X size={32} /> : <MessageCircle size={32} />}
      </button>
    </>
  );
}

export default ChatBot;
