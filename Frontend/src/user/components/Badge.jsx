function Badge({ children, variant = "info", className = "", dot }) {
  const vMap = {
    success: "badge-success",
    warning: "badge-warning",
    danger: "badge-danger",
    info: "badge-info",
    neutral: "badge-neutral",
  };
  return (
    <span className={`badge ${vMap[variant] || "badge-info"} ${className}`}>
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: variant === "success" ? "#16A34A"
              : variant === "warning" ? "#D97706"
                : variant === "danger" ? "#DC2626"
                  : "var(--primary)",
          }}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
