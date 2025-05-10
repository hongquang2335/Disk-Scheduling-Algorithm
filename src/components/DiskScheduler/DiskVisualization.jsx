const DiskVisualization = ({ title, path, totalMovement }) => {
  // Tính toán chiều rộng thực tế dựa trên max cylinder
  const calculatePosition = (cylinder, max) => (cylinder / max) * 100;

  return (
    <div className={`disk-visualization ${title.toLowerCase()}`}>
      <div className="header">
        <h3>{title}</h3>
        <div className="total-movement">
          Tổng di chuyển: <strong>{totalMovement}</strong> cylinders
        </div>
      </div>

      <div className="access-sequence">
        <div className="sequence-grid">
          {path.map((cylinder, index) => (
            <div key={index} className="cylinder">
              {index > 0 && (
                <span className="arrow">→</span>
              )}
              {cylinder}
            </div>
          ))}
        </div>
      </div>

      <div className="disk-track">
        <div className="track-labels">
          {[0, 1000, 2000, 3000, 4000, 5000].map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
        <div className="track-visual">
          {path.slice(1).map((cylinder, index) => {
            const prev = path[index];
            const left = calculatePosition(Math.min(prev, cylinder), 5000);
            const width = calculatePosition(Math.abs(cylinder - prev), 5000);
            
            return (
              <div
                key={index}
                className="track-segment"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  backgroundColor: getAlgorithmColor(title)
                }}
                title={`${prev} → ${cylinder} (${Math.abs(cylinder - prev)} cylinders)`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Hàm phụ trợ chọn màu
const getAlgorithmColor = (algorithm) => {
  const colors = {
    scan: '#e74c3c',
    cscan: '#3498db',
    look: '#2ecc71',
    clook: '#9b59b6'
  };
  return colors[algorithm.toLowerCase()] || '#4CAF50';
};

export default DiskVisualization;