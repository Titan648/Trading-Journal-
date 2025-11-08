import './Sidebar.css'

function Sidebar({ activeView, setActiveView }) {
  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: '▣' },
    { id: 'trade-log', label: 'TRADE LOG', icon: '▤' },
    { id: 'performance', label: 'PERFORMANCE', icon: '▥' },
    { id: 'settings', label: 'SETTINGS', icon: '▦' }
  ]

  const playSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'square'
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const handleClick = (id) => {
    playSound()
    setActiveView(id)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header pixel-font">MENU</div>
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => handleClick(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="version">v3.0.0</div>
      </div>
    </aside>
  )
}

export default Sidebar
