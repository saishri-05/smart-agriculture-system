import { useState } from "react";

function Input({ label, error, type = "text", className = "", ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="input-group">
      {label && <label className="label">{label}</label>}
      {type === "select" ? (
        <select
          className={`input ${error ? "input-error" : ""} ${className}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={`input ${error ? "input-error" : ""} ${className}`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      )}
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}

export default Input;
