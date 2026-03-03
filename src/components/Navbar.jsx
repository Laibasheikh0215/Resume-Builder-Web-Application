// src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../App'

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          Resume Builder
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/features" className="nav-link">Features</Link>
            </li>
            <li className="nav-item">
              <Link to="/pricing" className="nav-link">Pricing</Link>
            </li>
            <li className="nav-item">
              <button
                onClick={toggleDarkMode}
                className="btn btn-sm ms-2"
              >
                {darkMode ? '🌞' : '🌙'}
              </button>
            </li>
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-primary ms-2">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="btn btn-primary ms-2">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar