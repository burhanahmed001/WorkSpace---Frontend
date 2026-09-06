import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd'
import { 
  DashboardOutlined, 
  ProjectOutlined, 
  AppstoreOutlined, 
  SettingOutlined, 
  LogoutOutlined, 
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/Auth'

import Dashboard from './Dashboard'
import KanbanView from './KanbanView'
import ProjectView from './ProjectView'
import Settings from './Settings'
import PageNotFound from '@/components/PageNotFound'

const { Header, Sider, Content } = Layout

const WorkspaceContent = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, handleLogout } = useAuth()

  const apiUrl = import.meta.env.VITE_API_URL
  const appName = import.meta.env.VITE_APP_NAME || 'Workspace Manager'

  const menuItems = [
    {
      key: '/workspace',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/workspace')
    },
    {
      key: '/workspace/kanban',
      icon: <AppstoreOutlined />,
      label: 'Kanban Board',
      onClick: () => navigate('/workspace/kanban')
    },
    {
      key: '/workspace/projects',
      icon: <ProjectOutlined />,
      label: 'Projects',
      onClick: () => navigate('/workspace/projects')
    },
    {
      key: '/workspace/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/workspace/settings')
    }
  ]

  const userDropdownMenu = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: <span className="fw-medium">{user?.email || 'User Account'}</span>,
        disabled: true
      },
      { type: 'divider' },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Logout',
        danger: true,
        onClick: () => {
          handleLogout()
          navigate('/auth/login')
        }
      }
    ]
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="shadow-sm bg-white border-end"
        width={260}
      >
        <div className="p-3 d-flex align-items-center justify-content-between border-bottom">
          {!collapsed && (
            <span className="fw-bold fs-5 text-dark text-truncate ps-2">{appName}</span>
          )}
          <Button 
            type="text" 
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
            onClick={() => setCollapsed(!collapsed)}
            className="ms-auto"
          />
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="border-0 mt-2"
        />
      </Sider>

      <Layout>
        <Header className="bg-white px-4 border-bottom d-flex justify-content-between align-items-center" style={{ height: '64px' }}>
          <div className="text-muted small">
            API Endpoint: <span className="text-secondary font-monospace">{apiUrl}</span>
          </div>
          <Dropdown menu={userDropdownMenu} placement="bottomRight" trigger={['click']}>
            <div className="d-flex align-items-center cursor-pointer py-2 px-3 rounded hover-bg-light" style={{ cursor: 'pointer' }}>
              <Avatar style={{ backgroundColor: '#4f46e5' }} icon={<UserOutlined />} className="me-2" />
              <span className="fw-semibold text-dark">{user?.name || user?.email || 'Workspace User'}</span>
            </div>
          </Dropdown>
        </Header>

        <Content className="bg-light p-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='kanban' element={<KanbanView />} />
            <Route path='projects' element={<ProjectView />} />
            <Route path='settings' element={<Settings />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default WorkspaceContent