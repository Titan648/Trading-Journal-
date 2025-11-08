import { useState } from 'react'
import './TradeCard.css'

function TradeCard({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    entryPrice: '',
    exitPrice: '',
    positionSize: '',
    profitLoss: '',
    notes: '',
    screenshot: null
  })

  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      setUploading(true)
      setUploadProgress(0)
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setUploading(false)
            return 100
          }
          return prev + 10
        })
      }, 100)

      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          screenshot: e.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      entryPrice: '',
      exitPrice: '',
      positionSize: '',
      profitLoss: '',
      notes: '',
      screenshot: null
    })
    onCancel()
  }

  return (
    <div className="trade-card">
      <div className="card-header pixel-font">
        <span>NEW TRADE ENTRY</span>
      </div>
      
      <form onSubmit={handleSubmit} className="trade-form">
        <div className="form-row">
          <label className="form-label">DATE/TIME:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="retro-input"
            required
          />
        </div>

        <div 
          className={`drop-zone ${dragActive ? 'active' : ''} ${formData.screenshot ? 'has-file' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {formData.screenshot ? (
            <div className="preview-container">
              <img src={formData.screenshot} alt="Preview" className="screenshot-preview" />
              <button 
                type="button" 
                className="remove-image"
                onClick={() => setFormData(prev => ({ ...prev, screenshot: null }))}
              >
                [ REMOVE ]
              </button>
            </div>
          ) : (
            <>
              <div className="drop-icon">▼</div>
              <p className="drop-text">DROP CHART HERE</p>
              <p className="drop-subtext">OR CLICK TO BROWSE</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="file-input"
              />
            </>
          )}
          
          {uploading && (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="progress-text">UPLOADING... {uploadProgress}%</div>
            </div>
          )}
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">ENTRY PRICE:</label>
            <input
              type="number"
              step="0.01"
              name="entryPrice"
              value={formData.entryPrice}
              onChange={handleChange}
              className="retro-input"
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">EXIT PRICE:</label>
            <input
              type="number"
              step="0.01"
              name="exitPrice"
              value={formData.exitPrice}
              onChange={handleChange}
              className="retro-input"
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">POSITION SIZE:</label>
            <input
              type="number"
              step="0.01"
              name="positionSize"
              value={formData.positionSize}
              onChange={handleChange}
              className="retro-input"
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">PROFIT/LOSS:</label>
            <input
              type="number"
              step="0.01"
              name="profitLoss"
              value={formData.profitLoss}
              onChange={handleChange}
              className="retro-input"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">NOTES:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="retro-textarea"
            rows="4"
            placeholder="ENTER TRADE NOTES..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            <span className="button-text">SUBMIT</span>
            <span className="button-glow"></span>
          </button>
          <button type="button" className="retro-button" onClick={onCancel}>
            [ CANCEL ]
          </button>
        </div>
      </form>
    </div>
  )
}

export default TradeCard
