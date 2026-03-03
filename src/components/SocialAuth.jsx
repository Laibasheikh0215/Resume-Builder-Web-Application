import React from 'react'
import { supabase } from '../utils/supabaseClient'
import { useNavigate } from 'react-router-dom'

const SocialAuth = () => {
  const navigate = useNavigate()

  const handleSocialLogin = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      
      if (error) throw error
        
    } catch (error) {
      console.error('Social login error:', error)
    }
  }

  return (
    <div className="social-auth mb-4">
      <p className="text-center mb-3">Sign up with social account</p>
      <div className="d-flex justify-content-center gap-3">
        <button 
          className="btn btn-outline-dark"
          onClick={() => handleSocialLogin('github')}
        >
          <i className="bi bi-github me-2"></i>
          GitHub
        </button>
        <button 
          className="btn btn-outline-danger"
          onClick={() => handleSocialLogin('google')}
        >
          <i className="bi bi-google me-2"></i>
          Google
        </button>
      </div>
    </div>
  )
}

export default SocialAuth