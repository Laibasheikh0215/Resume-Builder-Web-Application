import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import ResumePreview from './ResumePreview'
import TemplateSelector from './TemplateSelector'
import ATSAnalyzer from './ATSAnalyzer'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const ResumeBuilder = () => {
  const [searchParams] = useSearchParams()
  const resumeId = searchParams.get('id')
  const navigate = useNavigate()
  const previewRef = useRef(null)
  

  const [resumeData, setResumeData] = useState({
    // Personal Information - Set initial values to empty strings
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    location: '',
    
    // Objective - Set initial value to empty string
    objective: '',
    
    // Experience -   ONE EMPTY ITEM by default with all fields initialized to empty strings or false
    experience: [
      {
        id: Date.now(),
        title: '',
        company: '',
        location: '',
        start_date: '',
        end_date: '',
        description: '',
        current: false
      }
    ],
    
    // Education - ONE EMPTY ITEM by default with all fields initialized to empty strings
    education: [
      {
        id: Date.now() + 1,
        degree: '',
        institution: '',
        location: '',
        year: '',
        gpa: ''
      }
    ],
    
    // Projects - ONE EMPTY ITEM by default with all fields initialized to empty strings
    projects: [
      {
        id: Date.now() + 2,
        title: '',
        description: '',
        technologies: '',
        link: ''
      }
    ],
    
    // Skills - Initialize as empty arrays
    technical_skills: [],
    additional_skills: [],
    certificates: [],
    
    // Template -   Set default template to 'modern'
    template: 'modern',
    
    // ATS Analysis
    ats_score: 0,
    suggestions: []
  })
  
  const [loading, setLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [skillInput, setSkillInput] = useState('')
  const [certInput, setCertInput] = useState('')
  const [previewKey, setPreviewKey] = useState(Date.now())
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Fetch resume data if editing
  useEffect(() => {
    if (resumeId) {
      fetchResumeData()
    }
  }, [resumeId])

  const fetchResumeData = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .single()
      
      if (error) throw error
      
      if (data) {
        setResumeData(data.data)
      }
    } catch (error) {
      console.error('Error fetching resume:', error)
      alert('Error loading resume: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle ALL input changes
  const handleInputChange = (field, value, index = null, section = null) => {
    console.log(`📝 Input changed: ${field} = ${value}`)
    
    if (section && index !== null) {
      setResumeData(prev => {
        const updatedArray = [...prev[section]]
        if (updatedArray[index]) {
          updatedArray[index] = {
            ...updatedArray[index],
            [field]: value
          }
        }
        return {
          ...prev,
          [section]: updatedArray
        }
      })
    } else if (section) {
      setResumeData(prev => ({
        ...prev,
        [section]: value
      }))
    } else {
      setResumeData(prev => ({
        ...prev,
        [field]: value
      }))
    }
    
    setPreviewKey(Date.now())
  }

  // Handle template change
  const handleTemplateChange = (templateId) => {
    setResumeData(prev => ({
      ...prev,
      template: templateId
    }))
    setPreviewKey(Date.now())
  }

  // Add new item
  const addItem = (section, defaultItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...defaultItem, id: Date.now() }]
    }))
    setPreviewKey(Date.now())
  }

  // Remove item
  const removeItem = (section, index) => {
    setResumeData(prev => {
      const updatedArray = [...prev[section]]
      updatedArray.splice(index, 1)
      return {
        ...prev,
        [section]: updatedArray.length ? updatedArray : [{
          id: Date.now(),
          ...(section === 'experience' ? {
            title: '',
            company: '',
            location: '',
            start_date: '',
            end_date: '',
            description: '',
            current: false
          } : section === 'education' ? {
            degree: '',
            institution: '',
            location: '',
            year: '',
            gpa: ''
          } : {
            title: '',
            description: '',
            technologies: '',
            link: ''
          })
        }]
      }
    })
    setPreviewKey(Date.now())
  }

  // Add skill
  const addSkill = () => {
    if (skillInput.trim()) {
      setResumeData(prev => ({
        ...prev,
        technical_skills: [...prev.technical_skills, skillInput.trim()]
      }))
      setSkillInput('')
      setPreviewKey(Date.now())
    }
  }

  // Remove skill
  const removeSkill = (index) => {
    setResumeData(prev => {
      const updatedSkills = [...prev.technical_skills]
      updatedSkills.splice(index, 1)
      return {
        ...prev,
        technical_skills: updatedSkills
      }
    })
    setPreviewKey(Date.now())
  }

  // Add certificate
  const addCertificate = () => {
    if (certInput.trim()) {
      setResumeData(prev => ({
        ...prev,
        certificates: [...prev.certificates, certInput.trim()]
      }))
      setCertInput('')
      setPreviewKey(Date.now())
    }
  }

  // Remove certificate
  const removeCertificate = (index) => {
    setResumeData(prev => {
      const updatedCerts = [...prev.certificates]
      updatedCerts.splice(index, 1)
      return {
        ...prev,
        certificates: updatedCerts
      }
    })
    setPreviewKey(Date.now())
  }

  // Handle key press for skill input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  // Save resume to Supabase - FIXED
  const saveResume = async () => {
    setLoading(true)
    setSaveSuccess(false)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
        return
      }
      
      // First, check if profile exists, if not create it
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (profileError && profileError.code === 'PGRST116') {
        // Profile doesn't exist, create it
        await supabase
          .from('profiles')
          .insert([
            {
              id: user.id,
              full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
              email: user.email,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])
      }
      
      // Prepare resume data for saving
      const resumeToSave = {
        user_id: user.id,
        name: resumeData.name || 'Untitled Resume',
        data: resumeData,
        template: resumeData.template,
        ats_score: resumeData.ats_score || 0,
        updated_at: new Date().toISOString()
      }
      
      let result
      
      if (resumeId) {
        // Update existing resume
        result = await supabase
          .from('resumes')
          .update(resumeToSave)
          .eq('id', resumeId)
          .select()
      } else {
        // Insert new resume
        result = await supabase
          .from('resumes')
          .insert([resumeToSave])
          .select()
      }
      
      const { data, error } = result
      
      if (error) throw error
      
      console.log('Resume saved successfully:', data)
      setSaveSuccess(true)
      
      // Show success message
      alert('Resume saved successfully!')
      
      // If this was a new resume, update the URL
      if (!resumeId && data && data[0]) {
        navigate(`/resume-builder?id=${data[0].id}`, { replace: true })
      } else {
        navigate('/dashboard')
      }
      
    } catch (error) {
      console.error('Error saving resume:', error)
      alert('Error saving resume: ' + error.message)
    } finally {
      setLoading(false)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }

  // Download as PDF 
  const downloadAsPDF = async () => {
    if (!previewRef.current) {
      alert('Preview not available')
      return
    }
    
    setDownloadLoading(true)
    
    try {
      const element = previewRef.current
      
      // Wait for images to load
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: false,
        useCORS: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      })
      
      const imgData = canvas.toDataURL('image/png')
      
      // Calculate PDF dimensions
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      const pdf = new jsPDF({
        orientation: imgHeight > pageHeight ? 'portrait' : 'portrait',
        unit: 'mm',
        format: 'a4'
      })
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      
      // Generate filename
      const fileName = `${resumeData.name || 'Resume'}_${resumeData.template}_${new Date().toISOString().split('T')[0]}.pdf`
      
      pdf.save(fileName)
      
      // Update download count in database - FIXED: removed supabase.sql
      if (resumeId) {
        try {
          // First get current download count
          const { data: currentData, error: fetchError } = await supabase
            .from('resumes')
            .select('download_count')
            .eq('id', resumeId)
            .single()
          
          if (!fetchError && currentData) {
            const currentCount = currentData.download_count || 0
            // Update with new count
            await supabase
              .from('resumes')
              .update({ download_count: currentCount + 1 })
              .eq('id', resumeId)
          }
        } catch (updateError) {
          console.error('Error updating download count:', updateError)
          // Don't show error to user, just log it
        }
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF: ' + error.message)
    } finally {
      setDownloadLoading(false)
    }
  }

  return (
    <div className="resume-builder">
      {/* Header */}
      <div className="bg-dark text-white py-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <button 
              className="btn btn-outline-light"
              onClick={() => navigate('/dashboard')}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back to Dashboard
            </button>
            <h4 className="mb-0">
              Resume Builder 
              <span className="badge bg-light text-dark ms-2">
                Template: {resumeData.template}
              </span>
            </h4>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-light"
                onClick={saveResume}
                disabled={loading}
              >
                <i className="bi bi-save me-2"></i>
                {loading ? 'Saving...' : 'Save Resume'}
              </button>
              <button 
                className="btn btn-success"
                onClick={downloadAsPDF}
                disabled={downloadLoading}
              >
                <i className="bi bi-download me-2"></i>
                {downloadLoading ? 'Generating PDF...' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="alert alert-success text-center m-3" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          Resume saved successfully!
        </div>
      )}

      <div className="container-fluid py-4">
        <div className="row">
          {/* Left Side - Form */}
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title mb-4">Edit Resume Details</h5>
                
                {/* Template Selector */}
                <TemplateSelector 
                  selected={resumeData.template}
                  onChange={handleTemplateChange}
                />
                
                {/* Personal Information */}
                <div className="mb-4">
                  <h6 className="border-bottom pb-2">Personal Information</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={resumeData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={resumeData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={resumeData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={resumeData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">LinkedIn URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={resumeData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">GitHub URL</label>
                      <input
                        type="url"
                        className="form-control"
                        value={resumeData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        placeholder="github.com/username"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Objective */}
                <div className="mb-4">
                  <h6 className="border-bottom pb-2">Career Objective</h6>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={resumeData.objective}
                    onChange={(e) => handleInputChange('objective', e.target.value)}
                    placeholder="Write a brief summary of your career goals..."
                  />
                </div>
                
                {/* Work Experience */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Work Experience</h6>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => addItem('experience', {
                        id: Date.now(),
                        title: '',
                        company: '',
                        location: '',
                        start_date: '',
                        end_date: '',
                        description: '',
                        current: false
                      })}
                    >
                      <i className="bi bi-plus me-1"></i>
                      Add Experience
                    </button>
                  </div>
                  
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Experience #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => removeItem('experience', index)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                        
                        <div className="row g-2">
                          <div className="col-md-6">
                            <label className="form-label">Job Title</label>
                            <input
                              type="text"
                              className="form-control"
                              value={exp.title}
                              onChange={(e) => handleInputChange('title', e.target.value, index, 'experience')}
                              placeholder="e.g., Lead Developer"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Company</label>
                            <input
                              type="text"
                              className="form-control"
                              value={exp.company}
                              onChange={(e) => handleInputChange('company', e.target.value, index, 'experience')}
                              placeholder="e.g., Tech Corp"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Start Date</label>
                            <input
                              type="month"
                              className="form-control"
                              value={exp.start_date}
                              onChange={(e) => handleInputChange('start_date', e.target.value, index, 'experience')}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">End Date</label>
                            <input
                              type="month"
                              className="form-control"
                              value={exp.end_date}
                              onChange={(e) => handleInputChange('end_date', e.target.value, index, 'experience')}
                              disabled={exp.current}
                            />
                          </div>
                          <div className="col-12">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={exp.current}
                                onChange={(e) => handleInputChange('current', e.target.checked, index, 'experience')}
                              />
                              <label className="form-check-label">Currently working here</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <label className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              rows="2"
                              value={exp.description}
                              onChange={(e) => handleInputChange('description', e.target.value, index, 'experience')}
                              placeholder="Describe your responsibilities..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Education */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0">Education</h6>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => addItem('education', {
                        id: Date.now(),
                        degree: '',
                        institution: '',
                        location: '',
                        year: '',
                        gpa: ''
                      })}
                    >
                      <i className="bi bi-plus me-1"></i>
                      Add Education
                    </button>
                  </div>
                  
                  {resumeData.education.map((edu, index) => (
                    <div key={edu.id} className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">Education #{index + 1}</h6>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => removeItem('education', index)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                        
                        <div className="row g-2">
                          <div className="col-md-6">
                            <label className="form-label">Degree</label>
                            <input
                              type="text"
                              className="form-control"
                              value={edu.degree}
                              onChange={(e) => handleInputChange('degree', e.target.value, index, 'education')}
                              placeholder="e.g., Bachelor of Science"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Institution</label>
                            <input
                              type="text"
                              className="form-control"
                              value={edu.institution}
                              onChange={(e) => handleInputChange('institution', e.target.value, index, 'education')}
                              placeholder="e.g., University Name"
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">Year</label>
                            <input
                              type="text"
                              className="form-control"
                              value={edu.year}
                              onChange={(e) => handleInputChange('year', e.target.value, index, 'education')}
                              placeholder="e.g., 2020-2024"
                            />
                          </div>
                          <div className="col-md-4">
                            <label className="form-label">GPA</label>
                            <input
                              type="text"
                              className="form-control"
                              value={edu.gpa}
                              onChange={(e) => handleInputChange('gpa', e.target.value, index, 'education')}
                              placeholder="e.g., 3.8/4.0"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Technical Skills */}
                <div className="mb-4">
                  <h6 className="border-bottom pb-2">Technical Skills</h6>
                  <div className="d-flex mb-2">
                    <input
                      type="text"
                      className="form-control me-2"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="e.g., React, Node.js, Python"
                      onKeyPress={handleKeyPress}
                    />
                    <button className="btn btn-primary" onClick={addSkill}>
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  
                  <div className="d-flex flex-wrap gap-2">
                    {resumeData.technical_skills.map((skill, index) => (
                      <span key={index} className="badge bg-primary d-flex align-items-center gap-1 p-2">
                        {skill}
                        <button 
                          className="btn btn-sm p-0 text-white"
                          onClick={() => removeSkill(index)}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Certificates */}
                <div className="mb-4">
                  <h6 className="border-bottom pb-2">Certificates</h6>
                  <div className="d-flex mb-2">
                    <input
                      type="text"
                      className="form-control me-2"
                      value={certInput}
                      onChange={(e) => setCertInput(e.target.value)}
                      placeholder="e.g., AWS Certified Developer"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addCertificate()
                        }
                      }}
                    />
                    <button className="btn btn-primary" onClick={addCertificate}>
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  
                  <div className="d-flex flex-wrap gap-2">
                    {resumeData.certificates.map((cert, index) => (
                      <span key={index} className="badge bg-success d-flex align-items-center gap-1 p-2">
                        {cert}
                        <button 
                          className="btn btn-sm p-0 text-white"
                          onClick={() => removeCertificate(index)}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                <ATSAnalyzer resumeData={resumeData} />
              </div>
            </div>
          </div>
          
          {/* Right Side - Live Preview */}
          <div className="col-lg-6">
            <div className="sticky-top" style={{ top: '20px' }}>
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-eye me-2"></i>
                    Live Preview
                  </h5>
                  <span className="badge bg-light text-dark">
                    {resumeData.template} template
                  </span>
                </div>
                <div className="card-body p-0">
                  <div 
                    ref={previewRef}
                    className="preview-container" 
                    style={{ 
                      minHeight: '800px',
                      backgroundColor: '#ffffff',
                      overflow: 'auto',
                      padding: '20px'
                    }}
                  >
                    <ResumePreview 
                      key={previewKey}
                      data={resumeData} 
                      template={resumeData.template}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder