const DiskVisualization = ({ title, path, totalMovement }) => {
    return (
      <div className="disk-visualization">
        <h3>{title}</h3>
        <p>Tổng di chuyển đầu đọc: {totalMovement} cylinders</p>
        
        <div className="access-sequence">
          <h4>Chuỗi truy cập:</h4>
          <div className="sequence-grid">
            {path.map((cylinder, index) => (
              <span key={index} className="cylinder">{cylinder}</span>
            ))}
          </div>
        </div>
  
        <div className="disk-track">
          <div className="track-labels">
            {[...Array(11)].map((_, i) => (
              <span key={i}>{i * 500}</span>
            ))}
          </div>
          <div className="track-visual">
            {path.map((cylinder, index) => {
              if (index === 0) return null;
              const prevCylinder = path[index - 1];
              const left = Math.min(prevCylinder, cylinder) / 5000 * 100;
              const width = Math.abs(cylinder - prevCylinder) / 5000 * 100;
              
              return (
                <div 
                  key={index}
                  className="track-movement"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
  
  export default DiskVisualization;