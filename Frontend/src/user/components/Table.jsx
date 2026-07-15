function Table({ headers, rows, className = "", onRowClick }) {
  return (
    <div className="table-wrap">
      <table className={`table ${className}`}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={h.width ? { width: h.width } : undefined}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              onClick={() => onRowClick?.(row, ri)}
              style={{ cursor: onRowClick ? "pointer" : undefined }}
            >
              {row.cells.map((cell, ci) => (
                <td key={ci}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
