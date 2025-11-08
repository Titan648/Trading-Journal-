import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import TradeLog from './components/TradeLog'
import Dashboard from './components/Dashboard'
import Performance from './components/Performance'
import Settings from './components/Settings'
import CRTEffect from './components/CRTEffect'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState('trade-log')
  const [trades, setTrades] = useState([])

  const addTrade = (trade) => {
    setTrades([...trades, { ...trade, id: Date.now() }])
  }

  const renderView = () => {
    switch(activeView) {
      case 'dashboard':
        return <Dashboard trades={trades} />
      case 'trade-log':
        return <TradeLog onAddTrade={addTrade} trades={trades} />
      case 'performance':
        return <Performance trades={trades} />
      case 'settings':
        return <Settings />
      default:
        return <TradeLog onAddTrade={addTrade} trades={trades} />
    }
  }

  return (
    <div className="app">
      <CRTEffect />
      <Header />
      <div className="main-container">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="content">
          {renderView()}
        </main>
      </div>
    </div>
  )
}

export default App
