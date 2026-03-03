import React from 'react'

const CreativeTemplate = ({ data }) => {
  // Check if any data exists
  const hasData = data.name || data.email || data.phone || data.location || 
                  data.objective || data.experience?.some(exp => exp.title) ||
                  data.education?.some(edu => edu.degree) ||
                  data.technical_skills?.length > 0 ||
                  data.additional_skills?.length > 0 ||
                  data.certificates?.length > 0 ||
                  data.projects?.some(proj => proj.title)

  if (!hasData) {
    return (
      <div style={{
        height: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        fontFamily: '"Poppins", sans-serif',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          width: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          backdropFilter: 'blur(10px)'
        }}>
          <i className="bi bi-palette" style={{ fontSize: '48px', color: 'white' }}></i>
        </div>
        <h4 style={{ fontSize: '28px', marginBottom: '15px', fontWeight: '600' }}>
          Creative Template
        </h4>
        <p style={{ fontSize: '16px', opacity: 0.9, maxWidth: '400px' }}>
          Your creative resume will appear here. Start adding your information on the left.
        </p>
        <div style={{
          marginTop: '40px',
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <span style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '8px 20px',
            borderRadius: '25px',
            fontSize: '14px'
          }}>
            🎨 Add your name
          </span>
          <span style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '8px 20px',
            borderRadius: '25px',
            fontSize: '14px'
          }}>
            ✨ Add skills
          </span>
          <span style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '8px 20px',
            borderRadius: '25px',
            fontSize: '14px'
          }}>
            🌟 Add experience
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="creative-template" style={{
      backgroundColor: '#ffffff',
      minHeight: '800px',
      fontFamily: '"Poppins", "Montserrat", sans-serif',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      maxWidth: '1000px',
      margin: '0 auto',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      borderRadius: '20px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Left Panel - Dark Creative Sidebar */}
      <div style={{
        backgroundColor: '#2c1810',
        color: 'white',
        padding: '40px 25px',
        position: 'relative',
        background: 'linear-gradient(145deg, #2c1810 0%, #4a2c2a 100%)'
      }}>
        {/* Decorative Element */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '0',
          height: '0',
          borderTop: '50px solid #e6b89c',
          borderLeft: '50px solid transparent'
        }}></div>

        {/* Profile Section */}
        <div style={{
          marginBottom: '40px',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}>
          {/* Profile Avatar */}
          <div style={{
            width: '120px',
            height: '120px',
            backgroundColor: '#e6b89c',
            borderRadius: '50%',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #f8e1d4',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
          }}>
            <span style={{
              fontSize: '48px',
              fontWeight: '800',
              color: '#2c1810'
            }}>
              {data.name ? data.name.charAt(0).toUpperCase() : '?'}
            </span>
          </div>

          {/* Name */}
          <h1 style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#e6b89c',
            marginBottom: '0',
            lineHeight: '1.2',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            textShadow: '3px 3px 0 rgba(0,0,0,0.2)'
          }}>
            {data.name?.split(' ')[0]?.toUpperCase() || 'YOUR'}
          </h1>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '300',
            color: '#f8e1d4',
            marginTop: '5px',
            letterSpacing: '6px',
            textTransform: 'uppercase'
          }}>
            {data.name?.split(' ')[1]?.toUpperCase() || 'NAME'}
          </h2>
          
          {/* Decorative Line */}
          <div style={{
            width: '80px',
            height: '4px',
            backgroundColor: '#e6b89c',
            margin: '20px auto 0',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Profile Section */}
        {data.objective && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#e6b89c',
              marginBottom: '15px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#e6b89c',
                borderRadius: '50%',
                display: 'inline-block'
              }}></span>
              PROFILE
            </h3>
            <p style={{
              fontSize: '13px',
              lineHeight: '1.8',
              color: '#f0e0d6',
              fontStyle: 'italic',
              paddingLeft: '10px',
              borderLeft: '2px solid #e6b89c'
            }}>
              {data.objective}
            </p>
          </div>
        )}

        {/* Contact Section */}
        {(data.email || data.phone || data.location || data.linkedin || data.github) && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#e6b89c',
              marginBottom: '20px',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#e6b89c',
                borderRadius: '50%',
                display: 'inline-block'
              }}></span>
              CONTACT
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {data.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <i className="bi bi-envelope" style={{ color: '#e6b89c', fontSize: '18px' }}></i>
                  <span style={{ fontSize: '13px', color: '#f0e0d6' }}>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <i className="bi bi-telephone" style={{ color: '#e6b89c', fontSize: '18px' }}></i>
                  <span style={{ fontSize: '13px', color: '#f0e0d6' }}>{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <i className="bi bi-geo-alt" style={{ color: '#e6b89c', fontSize: '18px' }}></i>
                  <span style={{ fontSize: '13px', color: '#f0e0d6' }}>{data.location}</span>
                </div>
              )}
              {data.linkedin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <i className="bi bi-linkedin" style={{ color: '#e6b89c', fontSize: '18px' }}></i>
                  <span style={{ fontSize: '13px', color: '#f0e0d6' }}>LinkedIn</span>
                </div>
              )}
              {data.github && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <i className="bi bi-github" style={{ color: '#e6b89c', fontSize: '18px' }}></i>
                  <span style={{ fontSize: '13px', color: '#f0e0d6' }}>GitHub</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Languages Section - Static for demo */}
        <div style={{ marginBottom: '35px' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#e6b89c',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{
              width: '30px',
              height: '30px',
              backgroundColor: '#e6b89c',
              borderRadius: '50%',
              display: 'inline-block'
            }}></span>
            LANGUAGE
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>English</span>
                <span style={{ fontSize: '12px', color: '#e6b89c' }}>Native</span>
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#4a2c2a',
                borderRadius: '3px'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#e6b89c',
                  borderRadius: '3px'
                }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>Spanish</span>
                <span style={{ fontSize: '12px', color: '#e6b89c' }}>Fluent</span>
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#4a2c2a',
                borderRadius: '3px'
              }}>
                <div style={{
                  width: '85%',
                  height: '100%',
                  backgroundColor: '#e6b89c',
                  borderRadius: '3px'
                }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Pattern */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          opacity: 0.1,
          fontSize: '80px',
          color: 'white',
          fontWeight: 'bold'
        }}>
          ✦ ✦ ✦
        </div>
      </div>

      {/* Right Panel - Light Creative Content */}
      <div style={{
        backgroundColor: '#fef9f7',
        padding: '40px 35px',
        position: 'relative'
      }}>
        {/* Decorative Header */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          backgroundColor: '#e6b89c',
          opacity: 0.1,
          borderRadius: '0 0 0 100px'
        }}></div>

        {/* Education Section */}
        {data.education?.some(edu => edu.degree) && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#2c1810',
              marginBottom: '25px',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              borderBottom: '3px solid #e6b89c',
              paddingBottom: '10px',
              display: 'inline-block'
            }}>
              EDUCATION
            </h3>
            
            {data.education.map((edu, index) => (
              edu.degree ? (
                <div key={index} style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 5px 20px rgba(230, 184, 156, 0.15)',
                  marginBottom: '15px',
                  borderLeft: '5px solid #e6b89c'
                }}>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#2c1810',
                    marginBottom: '5px'
                  }}>
                    {edu.degree}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#8a5a4a',
                    fontWeight: '500',
                    marginBottom: '8px'
                  }}>
                    {edu.institution || 'Institution'}
                    {edu.location && <span>, {edu.location}</span>}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    {edu.year && (
                      <span style={{
                        fontSize: '13px',
                        color: '#e6b89c',
                        fontWeight: '600',
                        backgroundColor: '#fef0e9',
                        padding: '4px 12px',
                        borderRadius: '20px'
                      }}>
                        {edu.year}
                      </span>
                    )}
                    {edu.gpa && (
                      <span style={{
                        fontSize: '13px',
                        color: '#2c1810',
                        fontWeight: '600'
                      }}>
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        )}

        {/* Experience Section */}
        {data.experience?.some(exp => exp.title) && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#2c1810',
              marginBottom: '25px',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              borderBottom: '3px solid #e6b89c',
              paddingBottom: '10px',
              display: 'inline-block'
            }}>
              EXPERIENCE
            </h3>
            
            {data.experience.map((exp, index) => (
              exp.title ? (
                <div key={index} style={{
                  marginBottom: '25px',
                  padding: '0 0 0 25px',
                  borderLeft: '2px dashed #e6b89c',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: '-8px',
                    top: '0',
                    width: '14px',
                    height: '14px',
                    backgroundColor: '#e6b89c',
                    borderRadius: '50%',
                    border: '3px solid white'
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '8px'
                  }}>
                    <h4 style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#2c1810',
                      marginBottom: '0'
                    }}>
                      {exp.title}
                    </h4>
                    {(exp.start_date || exp.end_date) && (
                      <span style={{
                        fontSize: '12px',
                        color: '#e6b89c',
                        fontWeight: '600',
                        backgroundColor: '#fef0e9',
                        padding: '3px 10px',
                        borderRadius: '15px'
                      }}>
                        {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                      </span>
                    )}
                  </div>
                  
                  <p style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#8a5a4a',
                    marginBottom: '12px'
                  }}>
                    {exp.company}
                    {exp.location && <span> • {exp.location}</span>}
                  </p>
                  
                  {exp.description && (
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.7',
                      color: '#5a3e36'
                    }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ) : null
            ))}
          </div>
        )}

        {/* Projects Section */}
        {data.projects?.some(proj => proj.title) && (
          <div style={{ marginBottom: '35px' }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#2c1810',
              marginBottom: '25px',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              borderBottom: '3px solid #e6b89c',
              paddingBottom: '10px',
              display: 'inline-block'
            }}>
              PROJECTS
            </h3>
            
            {data.projects.map((project, index) => (
              project.title ? (
                <div key={index} style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  boxShadow: '0 5px 20px rgba(230, 184, 156, 0.1)',
                  marginBottom: '15px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#2c1810',
                    marginBottom: '8px'
                  }}>
                    {project.title}
                  </h4>
                  {project.technologies && (
                    <p style={{
                      fontSize: '13px',
                      color: '#e6b89c',
                      fontWeight: '500',
                      marginBottom: '8px'
                    }}>
                      <i className="bi bi-code-slash me-1"></i>
                      {project.technologies}
                    </p>
                  )}
                  {project.description && (
                    <p style={{
                      fontSize: '14px',
                      color: '#5a3e36',
                      marginBottom: '10px',
                      lineHeight: '1.6'
                    }}>
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '13px',
                        color: '#e6b89c',
                        textDecoration: 'none',
                        fontWeight: '600',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <i className="bi bi-box-arrow-up-right"></i>
                      View Project
                    </a>
                  )}
                </div>
              ) : null
            ))}
          </div>
        )}

        {/* Skills Section */}
        {data.technical_skills?.length > 0 && (
          <div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#2c1810',
              marginBottom: '25px',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              borderBottom: '3px solid #e6b89c',
              paddingBottom: '10px',
              display: 'inline-block'
            }}>
              SKILLS
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '15px'
            }}>
              {data.technical_skills.map((skill, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  padding: '15px',
                  borderRadius: '10px',
                  boxShadow: '0 3px 10px rgba(230, 184, 156, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  border: '1px solid #f0e0d6'
                }}>
                  <div style={{
                    width: '35px',
                    height: '35px',
                    backgroundColor: '#e6b89c',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}>
                    {skill.charAt(0).toUpperCase()}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#2c1810'
                  }}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certificates?.length > 0 && (
          <div style={{ marginTop: '35px' }}>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#2c1810',
              marginBottom: '25px',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              borderBottom: '3px solid #e6b89c',
              paddingBottom: '10px',
              display: 'inline-block'
            }}>
              CERTIFICATIONS
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {data.certificates.map((cert, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #f0e0d6'
                }}>
                  <i className="bi bi-award" style={{ color: '#e6b89c', fontSize: '20px' }}></i>
                  <span style={{ fontSize: '14px', color: '#5a3e36' }}>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          opacity: 0.1,
          fontSize: '60px',
          color: '#e6b89c'
        }}>
          ✦ ✦ ✦
        </div>
      </div>
    </div>
  )
}

export default CreativeTemplate