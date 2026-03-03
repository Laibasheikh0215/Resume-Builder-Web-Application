import React, { useState, useEffect } from 'react'

const TemplateSelector = ({ selected, onChange }) => {
  // Add local state for immediate feedback
  const [localSelected, setLocalSelected] = useState(selected)

  // Sync local state with prop when selected changes
  useEffect(() => {
    setLocalSelected(selected)
  }, [selected])

  const templates = [
    { 
      id: 'modern', 
      name: 'Modern', 
      description: 'Clean and professional design',
      icon: 'bi-layout-text-window',
      color: '#4361ee',
      bgColor: 'rgba(67, 97, 238, 0.1)'
    },
    { 
      id: 'classic', 
      name: 'Classic', 
      description: 'Traditional format preferred by conservative industries',
      icon: 'bi-file-earmark-text',
      color: '#2d3748',
      bgColor: 'rgba(45, 55, 72, 0.1)'
    },
    { 
      id: 'creative', 
      name: 'Creative', 
      description: 'Unique design for creative professionals',
      icon: 'bi-palette',
      color: '#e63946',
      bgColor: 'rgba(230, 57, 70, 0.1)'
    }
  ]

  const handleTemplateClick = (templateId) => {
    console.log('Template clicked:', templateId)
    console.log('Current selected prop:', selected)
    console.log('Local selected state:', localSelected)
    
    // Update local state immediately for UI feedback
    setLocalSelected(templateId)
    
    // Call parent onChange
    onChange(templateId)
  }

  // Get current template details
  const getCurrentTemplate = () => {
    return templates.find(t => t.id === localSelected) || templates[0]
  }

  const currentTemplate = getCurrentTemplate()

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Choose Template</h6>
        <span className="badge" style={{ 
          backgroundColor: currentTemplate.color,
          color: 'white'
        }}>
          Selected: {currentTemplate.name}
        </span>
      </div>
      
      <div className="row g-3">
        {templates.map(template => {
          const isSelected = localSelected === template.id || selected === template.id
          
          return (
            <div key={template.id} className="col-md-4">
              <div 
                className={`card template-card ${isSelected ? 'border-2' : ''}`}
                onClick={() => handleTemplateClick(template.id)}
                style={{ 
                  cursor: 'pointer',
                  border: isSelected 
                    ? `2px solid ${template.color}` 
                    : '1px solid var(--border-color)',
                  backgroundColor: isSelected 
                    ? template.bgColor 
                    : 'var(--card-bg)',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                <div className="card-body text-center p-3">
                  <div className="mb-3">
                    <i className={`bi ${template.icon} display-5`} 
                       style={{ 
                         color: isSelected ? template.color : 'var(--text-secondary)',
                         transition: 'color 0.2s ease'
                       }}
                    ></i>
                  </div>
                  <h6 className="card-title mb-2">{template.name}</h6>
                  <p className="card-text small text-muted mb-2">{template.description}</p>
                  
                  {isSelected && (
                    <div className="mt-2">
                      <span className="badge" style={{ 
                        backgroundColor: template.color,
                        color: 'white'
                      }}>
                        <i className="bi bi-check-circle me-1"></i>
                        Selected
                      </span>
                    </div>
                  )}
                  
                  {!isSelected && (
                    <div className="mt-2">
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTemplateClick(template.id)
                        }}
                        style={{ fontSize: '12px' }}
                      >
                        Select
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Template Preview Section */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card" style={{ 
            borderLeft: `4px solid ${currentTemplate.color}`
          }}>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h6 className="mb-0" style={{ color: currentTemplate.color }}>
                  <i className={`bi ${currentTemplate.icon} me-2`}></i>
                  {currentTemplate.name} Template Preview
                </h6>
                <div>
                  <span className="badge me-2" style={{ 
                    backgroundColor: currentTemplate.color,
                    color: 'white'
                  }}>
                    Active Template
                  </span>
                </div>
              </div>
              
              {/* Template specific preview */}
              {localSelected === 'modern' && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex flex-column gap-2">
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Clean, minimalist design</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Professional typography</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>ATS friendly layout</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-column gap-2">
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Two-column layout</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Section highlights</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Skill badges</div>
                    </div>
                  </div>
                </div>
              )}
              
              {localSelected === 'classic' && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex flex-column gap-2">
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Traditional reverse-chronological</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Conservative design</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Professional fonts</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-column gap-2">
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Single column layout</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Clean borders</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Widely accepted format</div>
                    </div>
                  </div>
                </div>
              )}
              
              {localSelected === 'creative' && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="d-flex flex-column gap-2">
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Unique design elements</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Colorful accents</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Modern typography</div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-column gap-2">
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Skill visualization</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Creative spacing</div>
                      <div><i className="bi bi-check-circle-fill text-success me-2"></i>Portfolio ready</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Template change status */}
              <div className="mt-3 pt-3 border-top small text-muted">
                <i className="bi bi-arrow-repeat me-1"></i>
                Template changed to: <strong style={{ color: currentTemplate.color }}>{currentTemplate.name}</strong>
                <span className="ms-2">• Preview updating in real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Debug Info - Remove in production */}
      <div className="mt-3 small text-muted border-top pt-2">
        <div className="d-flex justify-content-between">
          <span>Debug: Prop selected = <strong>{selected}</strong></span>
          <span>Local state = <strong>{localSelected}</strong></span>
          <span>Status: <span className="text-success">Active</span></span>
        </div>
      </div>
    </div>
  )
}

export default TemplateSelector