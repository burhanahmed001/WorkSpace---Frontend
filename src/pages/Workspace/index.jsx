import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import WorkspaceLayout from './WorkspaceLayout'
import Dashboard from './Dashboard'
import KanbanBoard from './KanbanBoard'
import ProjectView from './ProjectView'
import Settings from './Settings'
import PageNotFound from '@/components/PageNotFound'

const WorkspaceRoutes = () => {
  return (
    <Routes>
      <Route element={<WorkspaceLayout />}>
        <Route path='/' element={<Navigate to="dashboard" replace />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='kanban' element={<KanbanBoard />} />
        <Route path='projects' element={<ProjectView />} />
        <Route path='settings' element={<Settings />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default WorkspaceRoutes