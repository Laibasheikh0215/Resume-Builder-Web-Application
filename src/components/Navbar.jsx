import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabaseClient'
import { useTheme } from '../App'

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Logo on left */}
        <Link className="navbar-brand" to="/">
          <i className="bi bi-file-earmark-text-fill me-2"></i>
          <span className="fw-bold">ResumeCraft</span>
        </Link>

        {/* Center Nav Links */}
        <div className="navbar-nav mx-auto">
          <Link className="nav-link" to="/">Home</Link>
          {user && <Link className="nav-link" to="/dashboard">Dashboard</Link>}
          <Link className="nav-link" to="/features">Features</Link>
          <Link className="nav-link" to="/pricing">Pricing</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
        </div>

        {/* Right side icons */}
        <div className="d-flex align-items-center gap-3">
          {/* Dark/Light mode toggle */}
          <button 
            className="btn btn-outline-secondary"
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? 
              <i className="bi bi-sun"></i> : 
              <i className="bi bi-moon"></i>
            }
          </button>

          {/* Auth buttons */}
          {user ? (
            <>
              <span className="nav-text d-none d-md-block">
                <i className="bi bi-person me-1"></i>
                {user.email?.split('@')[0]}
              </span>
              <button 
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar