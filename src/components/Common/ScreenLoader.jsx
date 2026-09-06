import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const ScreenLoader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 48, color: '#4f46e5' }} spin />

  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center bg-white"
      style={{
        minHeight: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
    >
      <Spin indicator={antIcon} />
      <div className="mt-3 fw-semibold text-secondary" style={{ letterSpacing: '0.5px' }}>
        Loading {import.meta.env.VITE_APP_NAME || 'Workspace Manager'}...
      </div>
    </div>
  )
}

export default ScreenLoader