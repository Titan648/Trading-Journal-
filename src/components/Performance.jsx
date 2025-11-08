import './Performance.css'

function Performance({ trades }) {
  const winningTrades = trades.filter(t => parseFloat(t.profitLoss) > 0)
  const losingTrades = trades.filter(t => parseFloat(t.profitLoss) < 0)
  
  const avgWin = winningTrades.length > 0 
    ? (winningTrades.reduce((sum, t) => sum + parseFloat(t.profitLoss), 0) / winningTrades.length).toFixed(2)
    : 0
    
  const avgLoss = losingTrades.length > 0
    ? (losingTrades.reduce((sum, t) => sum + parseFloat(t.profitLoss), 0) / losingTrades.length).toFixed(2)
    : 0

  return (
    <div className="performance">
      <h2 className="pixel-font section-title">PERFORMANCE METRICS</h2>
      
      <div className="metrics-container">
        <div className="metric-box">
          <div className="metric-header">WINNING TRADES</div>
          <div className="metric-body">
            <div className="metric-number profit">{winningTrades.length}</div>
            <div className="metric-detail">AVG: +{avgWin}</div>
          </div>
          <div className="metric-footer">
            <div className="progress-track">
              <div 
                className="progress-indicator profit"
                style={{ width: `${trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-header">LOSING TRADES</div>
          <div className="metric-body">
            <div className="metric-number loss">{losingTrades.length}</div>
            <div className="metric-detail">AVG: {avgLoss}</div>
          </div>
          <div className="metric-footer">
            <div className="progress-track">
              <div 
                className="progress-indicator loss"
                style={{ width: `${trades.length > 0 ? (losingTrades.length / trades.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="data-table">
        <div className="table-header pixel-font">RECENT ACTIVITY</div>
        <div className="table-content">
          {trades.length === 0 ? (
            <div className="no-data">NO DATA AVAILABLE</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>ENTRY</th>
                  <th>EXIT</th>
                  <th>SIZE</th>
                  <th>P/L</th>
                </tr>
              </thead>
              <tbody>
                {trades.slice(-10).reverse().map((trade, index) => (
                  <tr key={index}>
                    <td>{trade.date}</td>
                    <td>{trade.entryPrice}</td>
                    <td>{trade.exitPrice}</td>
                    <td>{trade.positionSize}</td>
                    <td className={parseFloat(trade.profitLoss) >= 0 ? 'profit' : 'loss'}>
                      {parseFloat(trade.profitLoss) >= 0 ? '+' : ''}{trade.profitLoss}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Performance
