import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import { DashboardOutlined, ProjectOutlined, AppstoreOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout

const WorkspaceLayout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.toastify("Logged out successfully", "success")
    navigate("/auth/login")
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="bg-white px-4 shadow-sm d-flex justify-content-between align-items-center" style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div className="fw-bold fs-5 text-primary" style={{ cursor: 'pointer' }} onClick={() => navigate('/workspace/dashboard')}>
          ⚡ Workspace Manager
        </div>
        <Menu mode="horizontal" defaultSelectedKeys={['dashboard']} className="border-0 flex-grow-1 mx-4">
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/workspace/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="projects" icon={<ProjectOutlined />}>
            <Link to="/workspace/projects">Projects</Link>
          </Menu.Item>
          <Menu.Item key="kanban" icon={<AppstoreOutlined />}>
            <Link to="/workspace/kanban">Kanban</Link>
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link to="/workspace/settings">Settings</Link>
          </Menu.Item>
        </Menu>
        <Button type="text" danger icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      <Content style={{ padding: '24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </Content>

      <Footer className="text-center text-muted py-3 bg-white border-top">
        Workspace Manager ©2026 Created for Seamless Collaboration.
      </Footer>
    </Layout>
  )
}

export default WorkspaceLayout