function StatCard({ label, value, icon: Icon, color = "var(--primary)", bgColor, trend, onClick }) {
  const iconBg = bgColor || `rgba(46, 125, 50, 0.08)`;
  return (
    <div
      className="card card-hover stat-card"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      <div>
        <div className="stat-card-label">{label}</div>
        <div className="stat-card-value">{value}</div>
        {trend && (
          <span
            className="badge"
            style={{
              background: trend.direction === "up"
                ? "rgba(34,197,94,0.1)"
                : trend.direction === "down"
                  ? "rgba(239,68,68,0.1)"
                  : "rgba(0,0,0,0.04)",
              color: trend.direction === "up"
                ? "#16A34A"
                : trend.direction === "down"
                  ? "#DC2626"
                  : "var(--text-secondary)",
              marginTop: 8,
            }}
          >
            {trend.label}
          </span>
        )}
      </div>
      {Icon && (
        <div className="stat-card-icon" style={{ background: iconBg }}>
          <Icon size={22} color={color} />
        </div>
      )}
    </div>
  );
}

export default StatCard;
