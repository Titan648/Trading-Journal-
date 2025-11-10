import { useState, useEffect } from 'react'
import './Header.css'

function Header() {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title pixel-font">
          TAFITA JOURNAL 1960
          <span className={`cursor ${showCursor ? 'visible' : ''}`}>_</span>
        </h1>
        <div className="header-info">
          <span className="system-status">SYSTEM ONLINE</span>
          <span className="separator">|</span>
          <span className="date-display">{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      <div className="header-border"></div>
    </header>
  )
}

export default Header
