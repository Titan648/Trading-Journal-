import { useState } from 'react'
import './Settings.css'

function Settings() {
  const [settings, setSettings] = useState({
    theme: 'green',
    sound: true,
    scanlines: true,
    crtEffect: true
  })

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  return (
    <div className="settings">
      <h2 className="pixel-font section-title">SYSTEM SETTINGS</h2>
      
      <div className="settings-panel">
        <div className="settings-section">
          <div className="section-header">DISPLAY OPTIONS</div>
          
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">COLOR THEME</div>
              <div className="setting-description">Primary terminal color</div>
            </div>
            <select 
              className="retro-select"
              value={settings.theme}
              onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))}
            >
              <option value="green">GREEN</option>
              <option value="amber">AMBER</option>
              <option value="blue">BLUE</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">SCANLINES</div>
              <div className="setting-description">CRT scanline effect</div>
            </div>
            <button 
              className={`toggle-button ${settings.scanlines ? 'active' : ''}`}
              onClick={() => handleToggle('scanlines')}
            >
              {settings.scanlines ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">CRT EFFECT</div>
              <div className="setting-description">Screen curvature overlay</div>
            </div>
            <button 
              className={`toggle-button ${settings.crtEffect ? 'active' : ''}`}
              onClick={() => handleToggle('crtEffect')}
            >
              {settings.crtEffect ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">AUDIO OPTIONS</div>
          
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">SYSTEM SOUNDS</div>
              <div className="setting-description">Enable retro sound effects</div>
            </div>
            <button 
              className={`toggle-button ${settings.sound ? 'active' : ''}`}
              onClick={() => handleToggle('sound')}
            >
              {settings.sound ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">DATA MANAGEMENT</div>
          
          <div className="action-buttons">
            <button className="action-button save">
              <span className="button-icon">💾</span>
              SAVE DATA
            </button>
            <button className="action-button print">
              <span className="button-icon">🖨</span>
              PRINT LOG
            </button>
            <button className="action-button export">
              <span className="button-icon">📤</span>
              EXPORT
            </button>
          </div>
        </div>

        <div className="system-info">
          <div className="info-line">VERSION: 3.0.0</div>
          <div className="info-line">BUILD: 19891015</div>
          <div className="info-line">STATUS: OPERATIONAL</div>
        </div>
      </div>
    </div>
  )
}

export default Settings
