import React from 'react'

const PageNotFound = () => {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        margin: 0
      }}
    >
      <h1 
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: '800',
          color: '#dc2626', 
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        Page Not Found 404
      </h1>
    </div>
  )
}

export default PageNotFound