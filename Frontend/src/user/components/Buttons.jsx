function PrimaryButton({ children, onClick, type = "button", disabled, size = "md", className = "", icon: Icon }) {
  const sMap = { sm: "btn-sm", md: "", lg: "btn-lg" };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-primary ${sMap[size] || ""} ${className}`}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {Icon && <Icon size={size === "sm" ? 16 : size === "lg" ? 22 : 18} />}
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, type = "button", disabled, size = "md", className = "", icon: Icon }) {
  const sMap = { sm: "btn-sm", md: "", lg: "btn-lg" };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-secondary ${sMap[size] || ""} ${className}`}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
    >
      {Icon && <Icon size={size === "sm" ? 16 : size === "lg" ? 22 : 18} />}
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, type = "button", size = "md", className = "", icon: Icon }) {
  const sMap = { sm: "btn-sm", md: "", lg: "btn-lg" };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-ghost ${sMap[size] || ""} ${className}`}
    >
      {Icon && <Icon size={size === "sm" ? 16 : 18} />}
      {children}
    </button>
  );
}

function DangerButton({ children, onClick, type = "button", size = "md", className = "" }) {
  const sMap = { sm: "btn-sm", md: "", lg: "btn-lg" };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-danger ${sMap[size] || ""} ${className}`}
    >
      {children}
    </button>
  );
}

export { PrimaryButton, SecondaryButton, GhostButton, DangerButton };
