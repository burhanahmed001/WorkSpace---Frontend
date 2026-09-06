import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const appName = import.meta.env.VITE_APP_NAME || 'Workspace Manager'
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-4 px-4 text-center text-md-start mt-auto shadow-sm border-top border-secondary" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        {/* Copyright Section */}
        <div className="small" style={{ color: '#94a3b8' }}>
          &copy; {currentYear} <span className="fw-semibold text-white">{appName}</span>. All rights reserved. Designed for professional workflow efficiency.
        </div>

        {/* Quick Links Section */}
        <div className="d-flex gap-4 small">
          <Link to="/privacy" className="text-decoration-none" style={{ color: '#94a3b8' }}>
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-decoration-none" style={{ color: '#94a3b8' }}>
            Terms of Service
          </Link>
          <Link to="/support" className="text-decoration-none" style={{ color: '#94a3b8' }}>
            Support Center
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer