import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    "app.name": "Smart Agriculture",
    "app.tagline": "IoT & AI Farming",
    "nav.dashboard": "Dashboard",
    "nav.analytics": "Analytics",
    "nav.sensors": "Sensors Details",
    "nav.farms": "Farms",
    "nav.robots": "Robots",
    "nav.robotAssignment": "Robot Assignment",
    "nav.aiRecommendations": "AI Recommendations",
    "nav.historicalData": "Historical Data",
    "nav.alerts": "Alerts",
    "nav.settings": "Settings",
    "search.placeholder": "Search...",
    "status.online": "Online",
    "profile.myProfile": "My Profile",
    "profile.logout": "Logout",
    "profile.name": "John Doe",
    "profile.role": "Farm Owner",
  },
  ja: {
    "app.name": "スマート農業",
    "app.tagline": "IoT & AI 農業",
    "nav.dashboard": "ダッシュボード",
    "nav.analytics": "分析",
    "nav.sensors": "センサー詳細",
    "nav.farms": "農場",
    "nav.robots": "ロボット",
    "nav.robotAssignment": "ロボット割り当て",
    "nav.aiRecommendations": "AI推奨",
    "nav.historicalData": "履歴データ",
    "nav.alerts": "アラート",
    "nav.settings": "設定",
    "search.placeholder": "検索...",
    "status.online": "オンライン",
    "profile.myProfile": "マイプロフィール",
    "profile.logout": "ログアウト",
    "profile.name": "ジョン・ドウ",
    "profile.role": "農場主",
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  function t(key) {
    return translations[lang]?.[key] || translations.en[key] || key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
