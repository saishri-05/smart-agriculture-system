export const lastSynced = new Date();

const generateHistory = (baseTemp, baseMoisture) => {
  const data = [];
  const now = new Date();
  for (let i = 60; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 60000);
    const time = t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const temp = baseTemp + Math.sin(i * 0.2) * 3 + (Math.random() - 0.5) * 2;
    const moisture = baseMoisture + Math.cos(i * 0.15) * 8 + (Math.random() - 0.5) * 4;
    data.push({ time, temperature: Math.round(temp * 10) / 10, soilMoisture: Math.round(Math.max(0, Math.min(100, moisture))) });
  }
  return data;
};

export const mockSensorReadings = {
  "ROB-001": {
    dht11: { temperature: 28.5, humidity: 62 },
    soilMoisture: 58,
    ultrasonic: 45,
    wifiLocation: { lat: 28.6239, lng: 77.209, label: "Sector A" },
  },
  "ROB-002": {
    dht11: { temperature: 31.2, humidity: 48 },
    soilMoisture: 34,
    ultrasonic: 120,
    wifiLocation: { lat: 28.6289, lng: 77.219, label: "Sector C" },
  },
  "ROB-003": {
    dht11: { temperature: 26.8, humidity: 71 },
    soilMoisture: 72,
    ultrasonic: 18,
    wifiLocation: { lat: 28.6219, lng: 77.212, label: "Sector B" },
  },
  "ROB-004": {
    dht11: { temperature: 24.3, humidity: 55 },
    soilMoisture: 45,
    ultrasonic: 200,
    wifiLocation: { lat: 28.6179, lng: 77.215, label: "Sector D" },
  },
};

export const mockHistoryData = {
  "ROB-001": generateHistory(28.5, 58),
  "ROB-002": generateHistory(31.2, 34),
  "ROB-003": generateHistory(26.8, 72),
  "ROB-004": generateHistory(24.3, 45),
};
