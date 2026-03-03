import React from 'react'

const ClassicTemplate = ({ data }) => {
  // Check if any data exists
  const hasData = data.name || data.email || data.phone || data.location || 
                  data.objective || data.experience?.some(exp => exp.title) ||
                  data.education?.some(edu => edu.degree) ||
                  data.technical_skills?.length > 0 ||
                  data.additional_skills?.length > 0 ||
                  data.certificates?.length > 0

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
        fontFamily: '"Times New Roman", Georgia, serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <i className="bi bi-file-earmark-text" style={{ fontSize: '64px', marginBottom: '20px', color: '#2c3e50' }}></i>
        <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Classic Template Preview</h4>
        <p style={{ color: '#7f8c8d' }}>Start filling the form on the left to see your resume</p>
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: '#ecf0f1', 
          borderRadius: '5px',
          width: '80%',
          maxWidth: '400px'
        }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', color: '#34495e' }}>
            <span>📝 Add your name</span>
            <span>•</span>
            <span>🎓 Add education</span>
            <span>•</span>
            <span>💼 Add experience</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="classic-template" style={{
      backgroundColor: '#ffffff',
      minHeight: '800px',
      fontFamily: '"Times New Roman", Georgia, serif',
      padding: '45px',
      color: '#000000',
      maxWidth: '900px',
      margin: '0 auto',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
    }}>
      {/* Header - Name and Contact Info */}
      <div style={{
        marginBottom: '30px',
        borderBottom: '3px double #2c3e50',
        paddingBottom: '20px'
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '800',
          color: '#1e2a3a',
          marginBottom: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          {data.name?.toUpperCase() || 'YOUR NAME'}
        </h1>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          fontSize: '14px',
          color: '#34495e',
          marginTop: '10px',
          borderTop: '1px solid #bdc3c7',
          paddingTop: '10px'
        }}>
          {data.email && <span>✉️ {data.email}</span>}
          {data.phone && <span>📞 {data.phone}</span>}
          {data.location && <span>📍 {data.location}</span>}
          {!data.email && !data.phone && !data.location && (
            <span style={{ color: '#95a5a6', fontStyle: 'italic' }}>
              Add contact information in the form
            </span>
          )}
        </div>
        
        {(data.linkedin || data.github) && (
          <div style={{
            fontSize: '13px',
            color: '#7f8c8d',
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px dashed #bdc3c7'
          }}>
            {data.linkedin && <span>🔗 LinkedIn: {data.linkedin}</span>}
            {data.github && <span> {data.linkedin ? ' | ' : ''}🐙 GitHub: {data.github}</span>}
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: '30px'
      }}>
        {/* Left Column */}
        <div>
          {/* Education */}
          {data.education?.some(edu => edu.degree) && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2c3e50',
                borderBottom: '2px solid #2c3e50',
                paddingBottom: '8px',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                EDUCATION
              </h2>
              {data.education.map((edu, index) => (
                edu.degree ? (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#2c3e50',
                      marginBottom: '5px'
                    }}>
                      {edu.degree}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#34495e',
                      marginBottom: '3px',
                      fontStyle: 'italic'
                    }}>
                      {edu.institution || 'Institution name'}
                      {edu.location && <span>, {edu.location}</span>}
                    </p>
                    {(edu.year || edu.gpa) && (
                      <p style={{
                        fontSize: '13px',
                        color: '#7f8c8d'
                      }}>
                        {edu.year && <span>{edu.year}</span>}
                        {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                      </p>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          )}

          {/* Skills */}
          {data.technical_skills?.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2c3e50',
                borderBottom: '2px solid #2c3e50',
                paddingBottom: '8px',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                TECHNICAL SKILLS
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {data.technical_skills.map((skill, index) => (
                  <span key={index} style={{
                    backgroundColor: '#ecf0f1',
                    color: '#2c3e50',
                    padding: '4px 12px',
                    borderRadius: '2px',
                    fontSize: '13px',
                    border: '1px solid #bdc3c7'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Skills */}
          {data.additional_skills?.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2c3e50',
                borderBottom: '2px solid #2c3e50',
                paddingBottom: '8px',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                ADDITIONAL SKILLS
              </h2>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#34495e'
              }}>
                {data.additional_skills.join(', ')}
              </p>
            </div>
          )}

          {/* Certifications */}
          {data.certificates?.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2c3e50',
                borderBottom: '2px solid #2c3e50',
                paddingBottom: '8px',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                CERTIFICATIONS
              </h2>
              <ul style={{
                margin: 0,
                paddingLeft: '20px',
                color: '#34495e'
              }}>
                {data.certificates.map((cert, index) => (
                  <li key={index} style={{ fontSize: '14px', marginBottom: '5px' }}>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Summary */}
          {data.objective && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2c3e50',
                borderBottom: '2px solid #2c3e50',
                paddingBottom: '8px',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                SUMMARY
              </h2>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#2c3e50',
                textAlign: 'justify'
              }}>
                {data.objective}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {data.experience?.some(exp => exp.title) && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2c3e50',
                borderBottom: '2px solid #2c3e50',
                paddingBottom: '8px',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                WORK EXPERIENCE
              </h2>
              {data.experience.map((exp, index) => (
                exp.title ? (
                  <div key={index} style={{ marginBottom: '25px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '5px'
                    }}>
                      <h3 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#2c3e50',
                        marginBottom: '3px'
                      }}>
                        {exp.title}
                      </h3>
                      {(exp.start_date || exp.end_date) && (
                        <span style={{
                          fontSize: '13px',
                          color: '#7f8c8d',
                          fontStyle: 'italic'
                        }}>
                          {exp.start_date && exp.start_date} 
                          {exp.start_date && exp.end_date && ' - '}
                          {exp.current ? 'Present' : exp.end_date}
                        </span>
                      )}
                    </div>
                    
                    <p style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#34495e',
                      marginBottom: '10px'
                    }}>
                      {exp.company}
                      {exp.location && <span>, {exp.location}</span>}
                    </p>
                    
                    {exp.description && (
                      <p style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: '#2c3e50'
                      }}>
                        {exp.description}
                      </p>
                    )}
                    
                    {exp.current && (
                      <span style={{
                        fontSize: '12px',
                        color: '#27ae60',
                        fontWeight: '600'
                      }}>
                        • Currently working here
                      </span>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects?.some(proj => proj.title) && (
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2c3e50',
                borderBottom: '2px solid #2c3e50',
                paddingBottom: '8px',
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                PROJECTS
              </h2>
              {data.projects.map((project, index) => (
                project.title ? (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#2c3e50',
                      marginBottom: '5px'
                    }}>
                      {project.title}
                    </h3>
                    {project.technologies && (
                      <p style={{
                        fontSize: '13px',
                        color: '#7f8c8d',
                        fontStyle: 'italic',
                        marginBottom: '5px'
                      }}>
                        Technologies: {project.technologies}
                      </p>
                    )}
                    {project.description && (
                      <p style={{
                        fontSize: '14px',
                        color: '#34495e',
                        marginBottom: '5px'
                      }}>
                        {project.description}
                      </p>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                        fontSize: '13px',
                        color: '#3498db',
                        textDecoration: 'none'
                      }}>
                        Project Link
                      </a>
                    )}
                  </div>
                ) : null
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {(data.linkedin || data.github) && (
        <div style={{
          marginTop: '30px',
          borderTop: '1px solid #bdc3c7',
          paddingTop: '15px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#7f8c8d'
        }}>
          {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
          {data.github && <span> {data.linkedin ? ' • ' : ''}GitHub: {data.github}</span>}
        </div>
      )}
    </div>
  )
}

export default ClassicTemplate