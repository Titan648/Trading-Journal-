import { useState } from 'react'
import TradeCard from './TradeCard'
import './TradeLog.css'

function TradeLog({ onAddTrade, trades }) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="trade-log">
      <div className="trade-log-header">
        <h2 className="pixel-font section-title">TRADE ENTRIES</h2>
        <button 
          className="retro-button add-button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? '[ CANCEL ]' : '[ + NEW TRADE ]'}
        </button>
      </div>

      {showForm && <TradeCard onSubmit={onAddTrade} onCancel={() => setShowForm(false)} />}

      <div className="trades-grid">
        {trades.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">▢</div>
            <p>NO TRADES LOGGED</p>
            <p className="empty-subtitle">INITIATE NEW ENTRY TO BEGIN</p>
          </div>
        ) : (
          trades.map(trade => (
            <div key={trade.id} className="trade-display-card">
              <div className="trade-header-display">
                <span className="trade-date">{trade.date}</span>
                <span className={`trade-pnl ${parseFloat(trade.profitLoss) >= 0 ? 'profit' : 'loss'}`}>
                  {parseFloat(trade.profitLoss) >= 0 ? '+' : ''}{trade.profitLoss}
                </span>
              </div>
              {trade.screenshot && (
                <div className="trade-screenshot">
                  <img src={trade.screenshot} alt="Trade chart" />
                </div>
              )}
              <div className="trade-details">
                <div className="detail-row">
                  <span className="detail-label">ENTRY:</span>
                  <span className="detail-value">{trade.entryPrice}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">EXIT:</span>
                  <span className="detail-value">{trade.exitPrice}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">SIZE:</span>
                  <span className="detail-value">{trade.positionSize}</span>
                </div>
                {trade.notes && (
                  <div className="trade-notes">
                    <div className="detail-label">NOTES:</div>
                    <div className="notes-content">{trade.notes}</div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TradeLog
