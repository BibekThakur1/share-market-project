import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/your-endpoint')
      .then(response => {
        setStockData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch stock data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading stock market data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Share Market Dashboard</h1>
      
      {/* Example stock list */}
      {stockData && stockData.length ? (
        <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Price</th>
              <th>Change</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map(stock => (
              <tr key={stock.id}>
                <td>{stock.name}</td>
                <td>{stock.price}</td>
                <td style={{ color: stock.change >= 0 ? 'green' : 'red' }}>
                  {stock.change}%
                </td>
                <td>{stock.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No stock data available</div>
      )}
    </div>
  );
}

export default App;
