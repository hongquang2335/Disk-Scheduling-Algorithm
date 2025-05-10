const ResultTable = ({ results }) => {
  if (!results) return null;

  return (
    <div className="result-table">
      <h3>So sánh các Thuật toán</h3>
      <table>
        <thead>
          <tr>
            <th>Thuật toán</th>
            <th>Tổng di chuyển</th>
            <th>Hiệu suất</th>
            <th>Chuỗi truy cập</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(results).map(([algorithm, data]) => (
            <tr key={algorithm}>
              <td>{algorithm.toUpperCase()}</td>
              <td>{data.totalMovement}</td>
              <td>
                {Math.round(
                  (Math.min(...Object.values(results).map(r => r.totalMovement)) / 
                  data.totalMovement) * 100
                )}%
              </td>

              <td className="path-cell">
                {data.path.join(' → ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ResultTable; 