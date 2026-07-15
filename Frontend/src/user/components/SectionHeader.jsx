function SectionHeader({ title, subtitle, action, className = "" }) {
  return (
    <div className={`section-header ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="section-header-title">{title}</h2>
          {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export default SectionHeader;
