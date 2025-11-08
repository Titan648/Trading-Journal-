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
          <div className={`stat-value ${totalPnL >= 0 ? 'profit' : 'loss'}`}>
            {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)}
          </div>
          <div className="stat-bar"></div>
        </div>
      </div>

      <div className="terminal-output">
        <div className="terminal-header">SYSTEM LOG</div>
        <div className="terminal-content">
          <div className="log-line">&gt; INITIALIZING TRADE LOG 3000...</div>
          <div className="log-line">&gt; LOADING TRADE DATA...</div>
          <div className="log-line">&gt; {totalTrades} ENTRIES FOUND</div>
          <div className="log-line">&gt; SYSTEM STATUS: OPERATIONAL</div>
          <div className="log-line blink">&gt; READY_</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
