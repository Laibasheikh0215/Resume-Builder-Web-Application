import React from 'react'

const StatsCard = ({ title, value, icon, color }) => {
  // Color mapping for different themes
  const getBgColor = () => {
    switch(color) {
      case 'primary': return 'var(--btn-primary-bg)';
      case 'success': return '#198754';
      case 'info': return '#0dcaf0';
      case 'warning': return '#ffc107';
      case 'danger': return '#dc3545';
      default: return 'var(--btn-primary-bg)';
    }
  }

  return (
    <div className="card stats-card border-0" style={{
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--border-color)',
      transition: 'all 0.2s ease'
    }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="card-subtitle mb-2" style={{ 
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {title}
            </h6>
            <h2 className="card-title" style={{ 
              color: 'var(--text-primary)',
              fontSize: '2rem',
              fontWeight: '600',
              margin: '0.5rem 0'
            }}>
              {value}
            </h2>
          </div>
          <div style={{ 
            color: getBgColor(),
            opacity: 0.8
          }}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatsCard