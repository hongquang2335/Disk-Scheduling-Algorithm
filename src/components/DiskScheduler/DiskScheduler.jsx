import { useState, useEffect } from 'react';
import ResultTable from './ResultTable';
import DiskVisualization from './DiskVisualization'; // Nếu bạn có

const DiskScheduler = () => {
  const [inputs, setInputs] = useState({
    currentPosition: 2150,
    requests: "2069, 1212, 2296, 2800, 544, 1618, 356, 1523, 4965, 3681",
    maxCylinder: 4999,
    direction: 'right'
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const parseRequests = () => {
    try {
      return inputs.requests.split(',')
        .map(item => {
          const num = parseInt(item.trim());
          if (isNaN(num)) throw new Error(`Giá trị không hợp lệ: ${item}`);
          if (num < 0 || num > inputs.maxCylinder) throw new Error(`Giá trị vượt quá phạm vi (0-${inputs.maxCylinder})`);
          return num;
        });
    } catch (err) {
      setError(err.message);
      return [];
    }
  };

  useEffect(() => {
    if (inputs.requests) {
      calculateResults();
    }
  }, [inputs]);

  // Dummy implementations (bạn cần thay bằng logic thật)
  const calculateSCAN = () => {
    const requests = parseRequests();
    let path = [parseInt(inputs.currentPosition), ...requests.sort((a, b) => a - b)];
    let totalMovement = Math.abs(path[path.length - 1] - path[0]);
    return { path, totalMovement };
  };

  const calculateCSCAN = () => {
    const requests = parseRequests();
    let path = [parseInt(inputs.currentPosition), ...requests.sort((a, b) => a - b)];
    let totalMovement = Math.abs(inputs.maxCylinder - inputs.currentPosition) + Math.abs(inputs.maxCylinder - Math.min(...requests));
    return { path, totalMovement };
  };

  const calculateLOOK = () => {
    const requests = parseRequests();
    let path = [parseInt(inputs.currentPosition), ...requests.sort((a, b) => a - b)];
    let totalMovement = Math.abs(Math.max(...requests) - inputs.currentPosition);
    return { path, totalMovement };
  };

  const calculateCLOOK = () => {
    const requests = parseRequests();
    let path = [parseInt(inputs.currentPosition), ...requests.sort((a, b) => a - b)];
    let totalMovement = Math.abs(Math.max(...requests) - inputs.currentPosition) + Math.abs(Math.max(...requests) - Math.min(...requests));
    return { path, totalMovement };
  };

  const calculateResults = () => {
    setError('');
    const requests = parseRequests();
    if (requests.length === 0) return;

    setResults({
      scan: calculateSCAN(),
      cscan: calculateCSCAN(),
      look: calculateLOOK(),
      clook: calculateCLOOK()
    });
  };

  return (
    <div className="disk-scheduler">
      <h1>Disk Scheduling Algorithms</h1>

      <div className="input-form">
        <div className="form-group">
          <label>Vị trí hiện tại của đầu đọc:</label>
          <input
            type="number"
            name="currentPosition"
            value={inputs.currentPosition}
            onChange={handleInputChange}
            min="0"
            max={inputs.maxCylinder}
          />
        </div>

        <div className="form-group">
          <label>Hướng di chuyển:</label>
          <select
            name="direction"
            value={inputs.direction}
            onChange={handleInputChange}
          >
            <option value="right">Phải (Tăng dần)</option>
            <option value="left">Trái (Giảm dần)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Chuỗi yêu cầu (cách nhau bằng dấu phẩy):</label>
          <input
            type="text"
            name="requests"
            value={inputs.requests}
            onChange={handleInputChange}
            placeholder="VD: 2069, 1212, 2296"
          />
        </div>

        <div className="form-group">
          <label>Số cylinder tối đa:</label>
          <input
            type="number"
            name="maxCylinder"
            value={inputs.maxCylinder}
            onChange={handleInputChange}
            min="1"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      {results && (
        <>
          <ResultTable results={results} />
          <div className="visualizations">
            <DiskVisualization title="SCAN" {...results.scan} />
            <DiskVisualization title="C-SCAN" {...results.cscan} />
            <DiskVisualization title="LOOK" {...results.look} />
            <DiskVisualization title="C-LOOK" {...results.clook} />
          </div>
        </>
      )}
    </div>
  );
};

export default DiskScheduler;
