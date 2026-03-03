import React from 'react'

const ModernTemplate = ({ data }) => {
  // Check if any data exists
  const hasData = data.name || data.email || data.phone || data.location || 
                  data.objective || data.experience?.some(exp => exp.title) ||
                  data.education?.some(edu => edu.degree) ||
                  data.technical_skills?.length > 0 ||
                  data.linkedin || data.github

  if (!hasData) {
    return (
      <div style={{
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
        fontFamily: '"Inter", sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <i className="bi bi-file-earmark-text" style={{ fontSize: '64px', marginBottom: '20px', color: '#4361ee' }}></i>
        <h4 style={{ color: '#1a2639', marginBottom: '10px' }}>Modern Template Preview</h4>
        <p style={{ color: '#6c757d' }}>Start filling the form on the left to see your resume</p>
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: '#e9ecef', 
          borderRadius: '10px',
          width: '80%',
          maxWidth: '400px'
        }}>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', color: '#4361ee' }}>
            <span>👤 Add name</span>
            <span>📧 Add email</span>
            <span>🔗 Add LinkedIn</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modern-template" style={{
      backgroundColor: '#ffffff',
      minHeight: '800px',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex',
      maxWidth: '1000px',
      margin: '0 auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      borderRadius: '12px',
      overflow: 'hidden'
    }}>
      {/* Left Sidebar - Dark Background */}
      <div style={{
        width: '35%',
        backgroundColor: '#1a2639',
        color: 'white',
        padding: '35px 25px'
      }}>
        {/* Profile Image/Initial */}
        <div style={{
          width: '120px',
          height: '120px',
          backgroundColor: '#2d3a5a',
          borderRadius: '50%',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid #4cc9f0'
        }}>
          <span style={{ fontSize: '48px', color: 'white', fontWeight: '600' }}>
            {data.name ? data.name.charAt(0).toUpperCase() : '?'}
          </span>
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '5px',
          color: 'white'
        }}>
          {data.name || 'Your Name'}
        </h1>
        
        {/* Contact Section - WITH LINKEDIN & GITHUB */}
        <div style={{ marginTop: '30px' }}>
          <h3 style={{
            fontSize: '18px',
            borderBottom: '2px solid #4cc9f0',
            paddingBottom: '8px',
            marginBottom: '15px',
            color: 'white'
          }}>
            CONTACT
          </h3>
          
          {data.email && (
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="bi bi-envelope" style={{ color: '#4cc9f0', fontSize: '16px', width: '20px' }}></i>
              <span style={{ fontSize: '13px', color: '#e0e0e0' }}>{data.email}</span>
            </div>
          )}
          
          {data.phone && (
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="bi bi-telephone" style={{ color: '#4cc9f0', fontSize: '16px', width: '20px' }}></i>
              <span style={{ fontSize: '13px', color: '#e0e0e0' }}>{data.phone}</span>
            </div>
          )}
          
          {data.location && (
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="bi bi-geo-alt" style={{ color: '#4cc9f0', fontSize: '16px', width: '20px' }}></i>
              <span style={{ fontSize: '13px', color: '#e0e0e0' }}>{data.location}</span>
            </div>
          )}
          
          {/* LinkedIn Link */}
          {data.linkedin && (
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="bi bi-linkedin" style={{ color: '#4cc9f0', fontSize: '16px', width: '20px' }}></i>
              <a 
                href={data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`}
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '13px', 
                  color: '#e0e0e0',
                  textDecoration: 'none',
                  wordBreak: 'break-all'
                }}
              >
                {data.linkedin.replace(/^https?:\/\//, '').replace(/^www\./, '')}
              </a>
            </div>
          )}
          
          {/* GitHub Link */}
          {data.github && (
            <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <i className="bi bi-github" style={{ color: '#4cc9f0', fontSize: '16px', width: '20px' }}></i>
              <a 
                href={data.github.startsWith('http') ? data.github : `https://${data.github}`}
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: '13px', 
                  color: '#e0e0e0',
                  textDecoration: 'none',
                  wordBreak: 'break-all'
                }}
              >
                {data.github.replace(/^https?:\/\//, '').replace(/^www\./, '')}
              </a>
            </div>
          )}
        </div>

        {/* Skills */}
        {data.technical_skills?.length > 0 && (
          <div style={{ marginTop: '30px' }}>
            <h3 style={{
              fontSize: '18px',
              borderBottom: '2px solid #4cc9f0',
              paddingBottom: '8px',
              marginBottom: '15px',
              color: 'white'
            }}>
              SKILLS
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {data.technical_skills.map((skill, index) => (
                <span key={index} style={{
                  backgroundColor: '#2d3a5a',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  border: '1px solid #4cc9f0',
                  color: 'white'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{
        width: '65%',
        backgroundColor: '#ffffff',
        padding: '35px'
      }}>
        {/* Objective */}
        {data.objective && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '18px',
              color: '#1a2639',
              borderBottom: '2px solid #4cc9f0',
              paddingBottom: '8px',
              marginBottom: '15px',
              fontWeight: '600'
            }}>
              ABOUT ME
            </h3>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#555' }}>
              {data.objective}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience?.some(exp => exp.title) && (
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{
              fontSize: '18px',
              color: '#1a2639',
              borderBottom: '2px solid #4cc9f0',
              paddingBottom: '8px',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              EXPERIENCE
            </h3>
            {data.experience.map((exp, index) => (
              exp.title && (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a2639' }}>
                      {exp.title}
                    </h4>
                    {(exp.start_date || exp.end_date) && (
                      <span style={{ fontSize: '12px', color: '#4cc9f0', fontWeight: '500' }}>
                        {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: '#4cc9f0', marginBottom: '8px', fontWeight: '500' }}>
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </p>
                  {exp.description && (
                    <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education */}
        {data.education?.some(edu => edu.degree) && (
          <div>
            <h3 style={{
              fontSize: '18px',
              color: '#1a2639',
              borderBottom: '2px solid #4cc9f0',
              paddingBottom: '8px',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              EDUCATION
            </h3>
            {data.education.map((edu, index) => (
              edu.degree && (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1a2639' }}>
                      {edu.degree}
                    </h4>
                    {edu.year && (
                      <span style={{ fontSize: '12px', color: '#4cc9f0' }}>
                        {edu.year}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: '#4cc9f0', marginBottom: '5px' }}>
                    {edu.institution} {edu.location && `• ${edu.location}`}
                  </p>
                  {edu.gpa && (
                    <p style={{ fontSize: '12px', color: '#666' }}>
                      GPA: {edu.gpa}
                    </p>
                  )}
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModernTemplate