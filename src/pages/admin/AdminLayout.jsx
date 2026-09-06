import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import { DashboardOutlined, TeamOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout

const AdminLayout = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.toastify("Logged out successfully", "success")
    navigate("/auth/login")
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="px-4 d-flex justify-content-between align-items-center" style={{ background: '#0f172a', borderBottom: '1px solid #1e293b' }}>
        <div className="fw-bold fs-5 text-white" style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/dashboard')}>
          🛡️ Admin Panel
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['dashboard']} className="border-0 flex-grow-1 mx-4" style={{ background: 'transparent' }}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/admin/dashboard">Overview</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<TeamOutlined />}>
            <Link to="/admin/users">Manage Users</Link>
          </Menu.Item>
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            <Link to="/admin/settings">Settings</Link>
          </Menu.Item>
        </Menu>
        <Button type="primary" danger ghost icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      <Content style={{ padding: '24px', background: '#f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </Content>

      <Footer className="text-center text-muted py-3 bg-white border-top">
        Admin Portal ©2026 Workspace Manager.
      </Footer>
    </Layout>
  )
}

export default AdminLayout