import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import Navbar from '../components/Navbar'
import SocialAuth from '../components/SocialAuth'
import { validateSignup } from '../utils/validation'
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [requirements, setRequirements] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    minLength: false
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'password') {
      setRequirements({
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        minLength: value.length >= 8
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    const validationErrors = validateSignup(formData)
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setLoading(true)
    
    try {
      // 1. Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name
          }
        }
      })
      
      if (authError) throw authError
      
      if (authData.user) {
        // 2. Create profile in profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,  // Same ID as auth user
              full_name: formData.name,
              email: formData.email,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ])
        
        if (profileError) {
          console.error('Profile creation error:', profileError)
          // If profile creation fails, we should still proceed but log the error
          // You might want to handle this differently
        }
        
        // 3. Show success message
        alert('Account created successfully! Please check your email for verification.')
        
        // 4. Redirect to login or dashboard
        navigate('/login')
      }
      
    } catch (error) {
      console.error('Signup error:', error)
      setErrors({ submit: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow border-0">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Create Your Account</h2>
                
                <SocialAuth />
                
                <div className="divider my-4 text-center">
                  <span className="px-3 ">OR</span>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="mt-2">
                      <small className="text-muted">Password must contain:</small>
                      <ul className="list-unstyled mt-1">
                        {Object.entries(requirements).map(([key, met]) => (
                          <li key={key} className="d-flex align-items-center gap-2">
                            {met ? 
                              <CheckCircle size={14} className="text-success" /> : 
                              <XCircle size={14} className="text-danger" />
                            }
                            <small>
                              {key === 'uppercase' && 'At least one uppercase letter'}
                              {key === 'lowercase' && 'At least one lowercase letter'}
                              {key === 'number' && 'At least one number'}
                              {key === 'specialChar' && 'At least one special character'}
                              {key === 'minLength' && 'Minimum 8 characters'}
                            </small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {errors.confirmPassword && 
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    }
                  </div>
                  
                  {errors.submit && (
                    <div className="alert alert-danger">{errors.submit}</div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-2"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </button>
                </form>
                
                <div className="text-center mt-4">
                  <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup