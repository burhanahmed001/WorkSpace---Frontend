import React, { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')

    if (token) {
      setIsAuthenticated(true)
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (e) {
          console.error("Failed to parse user from localStorage", e)
        }
      }
    }
    setLoading(false)
  }, [])

  const loginUser = (token, userData) => {
    localStorage.setItem('token', token)
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
    }
    setIsAuthenticated(true)
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AppContext.Provider value={{ user, isAuthenticated, loading, loginUser, logoutUser }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)