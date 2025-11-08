import './Dashboard.css'

function Dashboard({ trades }) {
  const totalTrades = trades.length
  const profitableTrades = trades.filter(t => parseFloat(t.profitLoss) > 0).length
  const totalPnL = trades.reduce((sum, t) => sum + parseFloat(t.profitLoss || 0), 0)
  const winRate = totalTrades > 0 ? ((profitableTrades / totalTrades) * 100).toFixed(1) : 0

  return (
    <div className="dashboard">
      <h2 className="pixel-font section-title">SYSTEM DASHBOARD</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">TOTAL TRADES</div>
          <div className="stat-value">{totalTrades}</div>
          <div className="stat-bar"></div>
        </div>

        <div className="stat-card">
          <div className="stat-label">WIN RATE</div>
          <div className="stat-value">{winRate}%</div>
          <div className="stat-bar"></div>
        </div>

        <div className="stat-card">
          <div className="stat-label">PROFITABLE</div>
          <div className="stat-value profit">{profitableTrades}</div>
          <div className="stat-bar"></div>
        </div>

        <div className="stat-card">
          <div className="stat-label">TOTAL P/L</div>
          <div className={
