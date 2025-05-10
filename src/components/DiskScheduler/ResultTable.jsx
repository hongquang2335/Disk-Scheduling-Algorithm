const ResultTable = ({ scanResult, cscanResult, lookResult, clookResult }) => {
    return (
      <div className="result-table">
        <h3>Kết quả các thuật toán</h3>
        <table>
          <thead>
            <tr>
              <th>Thuật toán</th>
              <th>Tổng di chuyển</th>
              <th>Chuỗi truy cập</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SCAN</td>
              <td>{scanResult.totalMovement}</td>
              <td>{scanResult.path.join(' → ')}</td>
            </tr>
            <tr>
              <td>C-SCAN</td>
              <td>{cscanResult.totalMovement}</td>
              <td>{cscanResult.path.join(' → ')}</td>
            </tr>
            <tr>
              <td>LOOK</td>
              <td>{lookResult.totalMovement}</td>
              <td>{lookResult.path.join(' → ')}</td>
            </tr>
            <tr>
              <td>C-LOOK</td>
              <td>{clookResult.totalMovement}</td>
              <td>{clookResult.path.join(' → ')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ResultTable;