import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  // Direct localStorage check karna sabse safe aur reliable tareeqa hai 
  // jab tak Auth context fully mount ya initialize ho raha ho.
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

export default PrivateRoute