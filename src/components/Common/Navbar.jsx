import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Avatar, Dropdown, Space } from 'antd'
import { 
  UserOutlined, 
  LogoutOutlined, 
  LoginOutlined, 
  UserAddOutlined, 
  DashboardOutlined 
} from '@ant-design/icons'
import { useAuth } from '@/context/Auth'

const Navbar = () => {
  const { isAuth, user, handleLogout } = useAuth()
  const navigate = useNavigate()
  const appName = import.meta.env.VITE_APP_NAME || 'Workspace Manager'

  const onLogout = () => {
    handleLogout()
    navigate('/auth/login')
  }

  const userMenuItems = [
    {
      key: 'user-info',
      disabled: true,
      label: (
        <div className="py-1">
          <div className="fw-bold text-dark">{user?.name || 'User Account'}</div>
          <div className="text-muted small">{user?.email || ''}</div>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'workspace',
      icon: <DashboardOutlined />,
      label: 'Go to Workspace',
      onClick: () => navigate('/workspace'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: onLogout,
    },
  ]

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top px-4 py-2 shadow-sm">
      <div className="container-fluid p-0">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-decoration-none">
          <span style={{ color: '#4f46e5' }}>{appName}</span>
        </Link>

        {/* Right Side Conditional Navigation */}
        <div className="d-flex align-items-center gap-3 ms-auto">
          {isAuth ? (
            <Space size="middle">
              <Button 
                type="primary" 
                icon={<DashboardOutlined />} 
                onClick={() => navigate('/workspace')}
                style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
                className="fw-medium rounded-2"
              >
                Workspace
              </Button>

              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                <div className="d-flex align-items-center gap-2 cursor-pointer p-1 px-2 rounded-2 border" style={{ cursor: 'pointer' }}>
                  <Avatar style={{ backgroundColor: '#4f46e5' }} icon={<UserOutlined />} size="small" />
                  <span className="fw-semibold text-dark me-1 d-none d-sm-inline">
                    {user?.name || user?.email || 'Account'}
                  </span>
                </div>
              </Dropdown>
            </Space>
          ) : (
            <Space size="small">
              <Link to="/auth/login">
                <Button icon={<LoginOutlined />} className="fw-medium rounded-2">
                  Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button 
                  type="primary" 
                  icon={<UserAddOutlined />} 
                  style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
                  className="fw-medium rounded-2"
                >
                  Register
                </Button>
              </Link>
            </Space>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar