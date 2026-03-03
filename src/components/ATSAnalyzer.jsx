import React from 'react'

const ATSAnalyzer = ({ resumeData }) => {
  
  const calculateATSScore = () => {
    let score = 50
    
    if (resumeData.name && resumeData.name.length > 0) score += 10
    if (resumeData.email && resumeData.email.includes('@')) score += 10
    if (resumeData.experience?.[0]?.title) score += 10
    if (resumeData.technical_skills?.length > 2) score += 10
    if (resumeData.objective && resumeData.objective.length > 50) score += 10
    
    return Math.min(score, 100)
  }

  const getSuggestions = () => {
    const suggestions = []
    
    if (!resumeData.name) suggestions.push('Add your full name')
    if (!resumeData.email) suggestions.push('Add your email address')
    if (!resumeData.objective || resumeData.objective.length < 50) 
      suggestions.push('Make your objective more detailed (minimum 50 characters)')
    if (resumeData.technical_skills?.length < 3) 
      suggestions.push('Add at least 3 technical skills')
    
    return suggestions
  }

  const score = calculateATSScore()
  const suggestions = getSuggestions()

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h5 className="mb-0">ATS Analysis</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <div className="d-flex justify-content-between mb-2">
            <span>ATS Score</span>
            <span className={`fw-bold ${score > 70 ? 'text-success' : score > 50 ? 'text-warning' : 'text-danger'}`}>
              {score}%
            </span>
          </div>
          <div className="progress" style={{ height: '10px' }}>
            <div 
              className={`progress-bar ${score > 70 ? 'bg-success' : score > 50 ? 'bg-warning' : 'bg-danger'}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
        
        {suggestions.length > 0 && (
          <div>
            <h6>Suggestions to Improve:</h6>
            <ul className="list-unstyled">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="mb-1">
                  <i className="bi bi-exclamation-circle text-warning me-2"></i>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {score > 80 && (
          <div className="alert alert-success mt-3">
            <i className="bi bi-check-circle me-2"></i>
            Your resume has a good ATS score! It should perform well with automated systems.
          </div>
        )}
      </div>
    </div>
  )
}

export default ATSAnalyzer