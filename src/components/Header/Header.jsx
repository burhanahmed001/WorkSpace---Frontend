import React from 'react'
import { Layout, Avatar, Dropdown, Badge, Button } from 'antd'
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined, 
  BellOutlined, 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  DashboardOutlined 
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/Auth'

const { Header: AntHeader } = Layout

const Header = ({ collapsed, setCollapsed }) => {
  const { user, handleLogout } = useAuth()
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
      label: 'Dashboard',
      onClick: () => navigate('/workspace'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Account Settings',
      onClick: () => navigate('/workspace/settings'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: onLogout,
    },
  ]

  return (
    <AntHeader className="bg-white px-4 border-bottom d-flex justify-content-between align-items-center sticky-top shadow-sm" style={{ height: '64px', zIndex: 999 }}>
      {/* Left Side: Collapse Toggle & App Title */}
      <div className="d-flex align-items-center gap-3">
        {setCollapsed && (
          <Button 
            type="text" 
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
            onClick={() => setCollapsed(!collapsed)}
            className="fs-5 text-secondary"
          />
        )}
        <span className="fw-bold fs-5 text-dark d-none d-sm-inline">
          {appName}
        </span>
      </div>

      {/* Right Side: Notifications & Profile Dropdown */}
      <div className="d-flex align-items-center gap-3">
        {/* Notification Badge Icon */}
        <Badge count={3} size="small">
          <Button 
            type="text" 
            icon={<BellOutlined style={{ fontSize: '18px' }} />} 
            className="d-flex align-items-center justify-content-center text-secondary rounded-circle border-0"
            style={{ width: '38px', height: '38px', backgroundColor: '#f8f9fa' }}
          />
        </Badge>

        {/* User Profile Dropdown Menu */}
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
          <div className="d-flex align-items-center gap-2 cursor-pointer p-1 px-2 rounded-2 hover-bg-light" style={{ cursor: 'pointer' }}>
            <Avatar style={{ backgroundColor: '#4f46e5' }} icon={<UserOutlined />} />
            <span className="fw-semibold text-dark d-none d-md-inline">
              {user?.name || user?.email?.split('@')[0] || 'Account'}
            </span>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  )
}

export default Header