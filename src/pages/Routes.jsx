import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './auth'
import WorkspaceRoutes from './Workspace'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/AdminDashboard'
import ManageUsers from './admin/ManageUsers'
import AdminSettings from './admin/AdminSettings'
import PrivateRoute from '../components/PrivateRoute'
import PageNotFound from '../components/PageNotFound'

const Index = () => {
  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <PrivateRoute>
            <Navigate to="/workspace" replace />
          </PrivateRoute>
        } 
      />

      <Route path='/auth/*' element={<Auth />} />

      {/* Normal Member Workspace Routes */}
      <Route 
        path='/workspace/*' 
        element={
          <PrivateRoute>
            <WorkspaceRoutes />
          </PrivateRoute>
        } 
      />

      {/* Completely Separate Admin Panel Routes */}
      <Route 
        path='/admin/*' 
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='users' element={<ManageUsers />} />
        <Route path='settings' element={<AdminSettings />} />
        {/* Default redirect inside admin */}
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default Index