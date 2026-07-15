function AppCard({ children, className = "", hover = true, padding = "md", onClick }) {
  const pMap = { sm: "card-sm", md: "", lg: "card-lg" };
  return (
    <div
      onClick={onClick}
      className={`card ${hover ? "card-hover" : ""} ${pMap[padding] || ""} ${className}`}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      {children}
    </div>
  );
}

function AppCardHeader({ children, className = "" }) {
  return <div className={`card-header ${className}`}>{children}</div>;
}

function AppCardBody({ children, className = "" }) {
  return <div className={`card-body ${className}`}>{children}</div>;
}

function AppCardFooter({ children, className = "" }) {
  return <div className={`card-footer ${className}`}>{children}</div>;
}

export { AppCard, AppCardHeader, AppCardBody, AppCardFooter };
export default AppCard;
