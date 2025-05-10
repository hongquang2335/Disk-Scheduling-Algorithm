import { useState } from 'react';
import DiskVisualization from './DiskVisualization';
import ResultTable from './ResultTable';
import './styles.css';

const DiskScheduler = () => {
  const [currentPosition] = useState(2150);
  const [initialRequest] = useState(1085);
  const [requests] = useState([2069, 1212, 2296, 2800, 544, 1618, 356, 1523, 4965, 3681]);
  const [maxCylinder] = useState(4999);

  // SCAN Algorithm
  const calculateSCAN = () => {
    const sortedRequests = [...requests].sort((a, b) => a - b);
    let path = [currentPosition];
    let totalMovement = 0;
    let current = currentPosition;
    let direction = 'right'; // Assume initially moving towards higher cylinders

    // Move to the end
    const higherRequests = sortedRequests.filter(req => req > current);
    for (const req of higherRequests) {
      path.push(req);
      totalMovement += Math.abs(req - current);
      current = req;
    }

    // Move to max cylinder if needed
    if (current < maxCylinder) {
      path.push(maxCylinder);
      totalMovement += maxCylinder - current;
      current = maxCylinder;
    }

    // Reverse direction
    const lowerRequests = sortedRequests.filter(req => req < currentPosition).sort((a, b) => b - a);
    for (const req of lowerRequests) {
      path.push(req);
      totalMovement += Math.abs(req - current);
      current = req;
    }

    return { path, totalMovement };
  };

  // C-SCAN Algorithm
  const calculateCSCAN = () => {
    const sortedRequests = [...requests].sort((a, b) => a - b);
    let path = [currentPosition];
    let totalMovement = 0;
    let current = currentPosition;

    // Move to the end
    const higherRequests = sortedRequests.filter(req => req > current);
    for (const req of higherRequests) {
      path.push(req);
      totalMovement += Math.abs(req - current);
      current = req;
    }

    // Move to max cylinder and jump to 0
    if (current < maxCylinder) {
      path.push(maxCylinder);
      totalMovement += maxCylinder - current;
    }
    path.push(0);
    totalMovement += maxCylinder; // From max to 0

    // Move up again
    current = 0;
    const lowerRequests = sortedRequests.filter(req => req < currentPosition);
    for (const req of lowerRequests) {
      path.push(req);
      totalMovement += Math.abs(req - current);
      current = req;
    }

    return { path, totalMovement };
  };

  // LOOK Algorithm
  const calculateLOOK = () => {
    const sortedRequests = [...requests].sort((a, b) => a - b);
    let path = [currentPosition];
    let totalMovement = 0;
    let current = currentPosition;
    let direction = 'right';

    // Move to the highest request
    const higherRequests = sortedRequests.filter(req => req > current);
    for (const req of higherRequests) {
      path.push(req);
      totalMovement += Math.abs(req - current);
      current = req;
    }

    // Reverse direction and move to the lowest request
    const lowerRequests = sortedRequests.filter(req => req < currentPosition).sort((a, b) => b - a);
    for (const req of lowerRequests) {
      path.push(req);
      totalMovement += Math.abs(req - current);
      current = req;
    }

    return { path, totalMovement };
  };

  // C-LOOK Algorithm
  const calculateCLOOK = () => {
    const sortedRequests = [...requests].sort((a, b) => a - b);
    let path = [currentPosition];
    let totalMovement = 0;
    let current = currentPosition;

    // Move to the highest request
    const higherRequests = sortedRequests.filter(req => req > current);
    for (const req of higherRequests) {
      path.push(req);
      totalMovement += Math.abs(req - current);
      current = req;
    }

    // Jump to the lowest request and continue
    const lowestRequest = Math.min(...sortedRequests.filter(req => req < currentPosition));
    if (lowestRequest !== Infinity) {
      path.push(lowestRequest);
      totalMovement += (current - Math.max(...sortedRequests.filter(req => req < currentPosition))) + 
                       (Math.max(...sortedRequests.filter(req => req < currentPosition)) - lowestRequest);
      current = lowestRequest;
    }

    // Move up through remaining requests
    const remainingRequests = sortedRequests.filter(req => req < currentPosition && req > lowestRequest).sort((a, b) => a - b);
    for (const req of remainingRequests) {
      path.push(req);
      totalMovement += Math.abs(req - current);
      current = req;
    }

    return { path, totalMovement };
  };

  const scanResult = calculateSCAN();
  const cscanResult = calculateCSCAN();
  const lookResult = calculateLOOK();
  const clookResult = calculateCLOOK();

  return (
    <div className="disk-scheduler">
      <h1>Disk Scheduling Algorithms</h1>
      <div className="info-section">
        <p><strong>Ổ đĩa có 5000 trục rãnh đánh số từ 0 đến 4999.</strong></p>
        <p>Đầu đọc/ghi đang ở trục rãnh {currentPosition}, nó vừa đáp ứng yêu cầu tại trục rãnh {initialRequest}.</p>
        <p>Yêu cầu vào/ra các khối dữ liệu trên các trục rãnh (theo trình tự FIFO): {requests.join(', ')}</p>
      </div>

      <ResultTable 
        scanResult={scanResult} 
        cscanResult={cscanResult} 
        lookResult={lookResult} 
        clookResult={clookResult} 
      />

      <div className="visualizations">
        <DiskVisualization 
          title="SCAN Algorithm" 
          path={scanResult.path} 
          totalMovement={scanResult.totalMovement} 
        />
        <DiskVisualization 
          title="C-SCAN Algorithm" 
          path={cscanResult.path} 
          totalMovement={cscanResult.totalMovement} 
        />
        <DiskVisualization 
          title="LOOK Algorithm" 
          path={lookResult.path} 
          totalMovement={lookResult.totalMovement} 
        />
        <DiskVisualization 
          title="C-LOOK Algorithm" 
          path={clookResult.path} 
          totalMovement={clookResult.totalMovement} 
        />
      </div>
    </div>
  );
};

export default DiskScheduler;