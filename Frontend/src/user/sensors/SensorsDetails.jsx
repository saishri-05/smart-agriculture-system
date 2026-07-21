import { useState, useMemo } from 'react';
import { useRobots } from '../../context/RobotContext';
import {
  mockSensorReadings, mockHistoryData, lastSynced,
} from '../../data/mockSensorData';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Thermometer, Droplets, MapPin, Cpu,
  ArrowLeft, Wifi, WifiOff, RefreshCw,
  Sprout, CheckCircle2, Leaf,
} from 'lucide-react';
import AppShell from "../components/AppShell";

const farmDetails = {
  "Green Valley Farm": { crop: "Rice", area: "18 acres", status: "Active", growth: "Healthy", fertilizer: 74, water: 72 },
  "Sunny Acres":       { crop: "Corn", area: "12 acres", status: "Monitoring", growth: "Good", fertilizer: 62, water: 61 },
  "Riverside Farm":    { crop: "Rice", area: "9 acres", status: "In Progress", growth: "Fair", fertilizer: 41, water: 42 },
  "Bluebell Estates":  { crop: "Soybean", area: "15 acres", status: "Active", growth: "Healthy", fertilizer: 68, water: 55 },
  "Meadow Creek Farms":{ crop: "Wheat", area: "22 acres", status: "Active", growth: "Good", fertilizer: 55, water: 63 },
};

const tempColor = (t) => {
  if (t < 15) return '#3B82F6';
  if (t <= 30) return '#2E7D32';
  return '#EF4444';
};

const humidityColor = (h) => {
  if (h >= 40 && h <= 70) return '#2E7D32';
  if (h > 70 && h <= 85) return '#F59E0B';
  return '#EF4444';
};

const soilColor = (s) => {
  if (s < 20) return '#EF4444';
  if (s <= 60) return '#2E7D32';
  return '#3B82F6';
};

const soilLabel = (s) => {
  if (s < 20) return 'Too Dry';
  if (s <= 60) return 'Optimal';
  return 'Too Wet';
};

function SemiGauge({ value, max, unit, label, color, size = 160 }) {
  const ratio = Math.min(value / max, 1);
  const bgColor = '#E5E7EB';
  const cx = size / 2, cy = size / 2 + 6, r = size / 2 - 24;
  const circumference = Math.PI * r;
  const offset = circumference * (1 - ratio);
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={bgColor} strokeWidth="12" strokeLinecap="round" />
        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        <text x={cx} y={cy - 2} textAnchor="middle" fontSize="20" fontWeight="800" fill="#111827">{value}{unit}</text>
      </svg>
      <span className="text-[10px] font-medium text-[#5A7A5A] -mt-1">{label}</span>
    </div>
  );
}

function SoilGauge({ value, size = 180 }) {
  const ratio = Math.min(value / 100, 1);
  const color = soilColor(value);
  const bgColor = '#E5E7EB';
  const cx = size / 2, cy = size / 2, r = size / 2 - 20;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - ratio);
  const optStart = (20 / 100) * circumference;
  const optEnd = (60 / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={bgColor} strokeWidth="14" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(46,125,50,0.15)" strokeWidth="14"
          strokeDasharray={`${optEnd - optStart} ${circumference}`} strokeDashoffset={-optStart} strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="28" fontWeight="800" fill="#111827">{value}%</text>
        <text x={cx} y={cy + 16} textAnchor="middle" fontSize="10" fontWeight="600" fill="#5A7A5A">{soilLabel(value)}</text>
      </svg>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg bg-white/95 px-3 py-2 text-xs shadow-lg border border-slate-200">
      <p className="font-bold text-[#111827] mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="font-semibold" style={{ color: p.color }}>{p.name}: {p.value}{p.name === 'Temperature' ? '°C' : '%'}</p>
      ))}
    </div>
  );
}

export default function SensorsDetails() {
  const { robots } = useRobots();
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [lastSyncStr] = useState(() => {
    const d = lastSynced;
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  });

  const readingFor = (robotId) => mockSensorReadings[robotId];

  const fleetStats = useMemo(() => {
    const online = robots.filter((r) => r.status !== 'Offline').length;
    const temps = robots
      .filter((r) => r.status !== 'Offline')
      .map((r) => readingFor(r.id)?.dht11?.temperature)
      .filter(Boolean);
    const avgTemp = temps.length > 0
      ? Math.round((temps.reduce((s, v) => s + v, 0) / temps.length) * 10) / 10
      : 0;
    const moistures = robots
      .filter((r) => r.status !== 'Offline')
      .map((r) => readingFor(r.id)?.soilMoisture)
      .filter(Boolean);
    const avgMoisture = moistures.length > 0
      ? Math.round((moistures.reduce((s, v) => s + v, 0) / moistures.length) * 10) / 10
      : 0;
    return { online: `${online}/${robots.length}`, avgTemp, avgMoisture, total: robots.length };
  }, [robots]);

  if (!robots || robots.length === 0) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <p className="text-sm text-[#5A7A5A]">No robot data available.</p>
        </div>
      </AppShell>
    );
  }

  if (selectedRobot) {
    const r = selectedRobot;
    const rId = r.id;
    const readings = readingFor(rId);
    const historyData = mockHistoryData[rId] || [];
    const isOnline = r.status !== 'Offline';

    return (
      <AppShell>
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedRobot(null)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(46,125,50,0.12)] text-[#2E7D32] hover:bg-[rgba(46,125,50,0.2)] transition-all">
              <ArrowLeft size={22} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">{r.id}</h1>
              <p className="mt-1 text-sm text-[#5A7A5A]">{r.farm} &middot; {r.model}</p>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <span className={`badge ${isOnline ? "badge-success" : "badge-danger"}`}>
                <span className={`mr-1.5 inline-block h-2 w-2 rounded-full ${isOnline ? "bg-[#2E7D32]" : "bg-[#EF4444]"}`} />
                {r.status}
              </span>
              <span className="badge badge-neutral">
                <Cpu size={14} className="mr-1" /> Battery {r.battery}%
              </span>
            </div>
          </div>

          <section>
            <h2 className="mb-6 text-xl font-bold text-[#111827]">Farm Assignment</h2>
            {(() => {
              const fd = farmDetails[r.farm];
              if (!fd) return <p className="text-sm text-[#5A7A5A]">No farm details available.</p>;
              return (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  <article className="card">
                    <div className="mb-5 flex items-center gap-4">
                      <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><Sprout size={30} /></span>
                      <h3 className="font-black">Farm</h3>
                    </div>
                    <p className="text-3xl font-bold text-black">{r.farm}</p>
                    <p className="mt-2 text-sm text-slate-600">{fd.crop} &middot; {fd.area}</p>
                  </article>
                  <article className="card">
                    <div className="mb-5 flex items-center gap-4">
                      <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><CheckCircle2 size={30} /></span>
                      <h3 className="font-black">Growth Status</h3>
                    </div>
                    <p className="text-3xl font-bold text-black">{fd.growth}</p>
                    <p className="mt-2 text-sm text-slate-600">Status: {fd.status}</p>
                  </article>
                  <article className="card">
                    <div className="mb-5 flex items-center gap-4">
                      <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><Droplets size={30} /></span>
                      <h3 className="font-black">Water Level</h3>
                    </div>
                    <p className="text-3xl font-bold text-black">{fd.water}%</p>
                    <p className="mt-2 text-sm text-slate-600">{fd.water >= 70 ? "Optimal" : fd.water >= 40 ? "Moderate" : "Low"}</p>
                  </article>
                  <article className="card">
                    <div className="mb-5 flex items-center gap-4">
                      <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><Leaf size={30} /></span>
                      <h3 className="font-black">Fertilizer</h3>
                    </div>
                    <p className="text-3xl font-bold text-black">{fd.fertilizer}%</p>
                    <p className="mt-2 text-sm text-slate-600">{fd.fertilizer >= 70 ? "Well Nourished" : fd.fertilizer >= 40 ? "Adequate" : "Needs Attention"}</p>
                  </article>
                </div>
              );
            })()}
          </section>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#111827]">
                <Thermometer size={20} className="text-[#2E7D32]" /> DHT11 — Temperature & Humidity
              </h3>
              {isOnline && readings ? (
                <div className="flex items-center justify-around">
                  <SemiGauge value={readings.dht11.temperature} max={50} unit="°C" label="Temperature" color={tempColor(readings.dht11.temperature)} />
                  <SemiGauge value={readings.dht11.humidity} max={100} unit="%" label="Humidity" color={humidityColor(readings.dht11.humidity)} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[100px]">
                  <span className="badge badge-neutral">Sensor Offline</span>
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#111827]">
                <Droplets size={20} className="text-[#2E7D32]" /> Soil Moisture
              </h3>
              {isOnline && readings ? (
                <div className="flex justify-center">
                  <SoilGauge value={readings.soilMoisture} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[180px]">
                  <span className="badge badge-neutral">Sensor Offline</span>
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-[#111827]">
                <MapPin size={20} className="text-[#2E7D32]" /> WiFi Location
              </h3>
              {isOnline && readings ? (
                <div className="flex flex-col items-center gap-3">
                  <span className="badge badge-success">
                    <Wifi size={12} className="mr-1" /> Tracking Active
                  </span>
                  <div className="w-full rounded-xl border border-dashed border-slate-200 bg-[rgba(0,0,0,0.02)] p-4 text-center">
                    <MapPin size={24} className="mx-auto mb-2 text-[#2E7D32]" />
                    <p className="text-sm font-bold text-[#111827]">
                      {readings.wifiLocation.lat.toFixed(4)}, {readings.wifiLocation.lng.toFixed(4)}
                    </p>
                    <p className="mt-1 text-[10px] text-[#5A7A5A]">{readings.wifiLocation.label}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[180px]">
                  <span className="badge badge-neutral">Sensor Offline</span>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#111827]">Sensor Reading History</h3>
            </div>
            {historyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={historyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#5A7A5A', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="temp" domain={[10, 40]} tick={{ fontSize: 11, fill: '#5A7A5A', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="moisture" domain={[0, 100]} orientation="right" tick={{ fontSize: 11, fill: '#5A7A5A', fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line yAxisId="temp" type="monotone" dataKey="temperature" stroke="#EF4444" strokeWidth={2.5} dot={false} name="Temperature" activeDot={{ r: 4, fill: '#EF4444', stroke: '#fff', strokeWidth: 2 }} />
                  <Line yAxisId="moisture" type="monotone" dataKey="soilMoisture" stroke="#2E7D32" strokeWidth={2.5} dot={false} name="Soil Moisture" activeDot={{ r: 4, fill: '#2E7D32', stroke: '#fff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[220px] items-center justify-center text-sm text-[#5A7A5A]">No history data available</div>
            )}
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Robot Sensor Details</h1>
            <p className="mt-1 text-sm font-[400] text-[#5A7A5A]">Live sensor readings from every robot in the fleet</p>
          </div>
        </div>

        <section>
          <h2 className="mb-6 text-xl font-bold text-[#111827]">Fleet Overview</h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><Wifi size={30} /></span>
                <h3 className="font-black">Sensors Online</h3>
              </div>
              <p className="text-3xl font-bold text-black">{fleetStats.online}</p>
            </article>
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><Thermometer size={30} /></span>
                <h3 className="font-black">Avg Temperature</h3>
              </div>
              <p className="text-3xl font-bold text-black">{fleetStats.avgTemp}°C</p>
            </article>
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><Droplets size={30} /></span>
                <h3 className="font-black">Avg Soil Moisture</h3>
              </div>
              <p className="text-3xl font-bold text-black">{fleetStats.avgMoisture}%</p>
            </article>
            <article className="card">
              <div className="mb-5 flex items-center gap-4">
                <span className="rounded-lg bg-[rgba(46,125,50,0.12)] p-3 text-[#2E7D32]"><RefreshCw size={30} /></span>
                <h3 className="font-black">Last Synced</h3>
              </div>
              <p className="text-3xl font-bold text-black">{lastSyncStr}</p>
            </article>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-xl font-bold text-[#111827]">Robot Sensor Grid</h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {robots.filter(r => r.status !== 'Offline').map((r) => {
            const rId = r.id;
            const readings = readingFor(rId);
            const isOnline = r.status !== 'Offline';

            return (
              <div key={r.id} onClick={() => setSelectedRobot(r)}
                className="card cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-base font-bold text-[#111827] truncate">{r.id}</p>
                    <p className="text-xs text-[#5A7A5A] truncate">{r.farm}</p>
                  </div>
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ml-2 ${r.status === 'Active' ? 'bg-[#2E7D32]' : r.status === 'Idle' ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'}`} />
                </div>

                {!isOnline ? (
                  <div className="flex items-center justify-center h-[140px]">
                    <div className="flex flex-col items-center gap-2">
                      <WifiOff size={24} className="text-[#9CA3AF]" />
                      <span className="badge badge-neutral">Sensor Offline</span>
                    </div>
                  </div>
                ) : readings ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#5A7A5A] uppercase tracking-wider">DHT11</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold" style={{ color: tempColor(readings.dht11.temperature) }}>
                          <Thermometer size={14} className="mr-0.5 inline" />{readings.dht11.temperature}°C
                        </span>
                        <span className="text-sm font-bold" style={{ color: humidityColor(readings.dht11.humidity) }}>
                          <Droplets size={14} className="mr-0.5 inline" />{readings.dht11.humidity}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-[#5A7A5A] uppercase tracking-wider">Soil Moisture</span>
                        <span className="text-xs font-bold" style={{ color: soilColor(readings.soilMoisture) }}>{readings.soilMoisture}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[rgba(0,0,0,0.06)]">
                        <div className="h-full rounded-full transition-all" style={{ width: `${readings.soilMoisture}%`, background: soilColor(readings.soilMoisture) }} />
                      </div>
                      <div className="mt-1 text-[10px] font-medium" style={{ color: soilColor(readings.soilMoisture) }}>{soilLabel(readings.soilMoisture)}</div>
                    </div>
                    <div className="flex items-center gap-1.5 pt-2">
                      <MapPin size={13} className="text-[#5A7A5A]" />
                      <span className="text-[10px] text-[#5A7A5A]">({readings.wifiLocation.lat.toFixed(2)}, {readings.wifiLocation.lng.toFixed(2)})</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[120px] items-center justify-center">
                    <span className="text-[11px] text-[#5A7A5A]">No sensor data</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        </section>
      </section>
    </AppShell>
  );
}
