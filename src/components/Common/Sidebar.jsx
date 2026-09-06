import React from 'react'
import { Menu } from 'antd'
import { 
  DashboardOutlined, 
  ProjectOutlined, 
  AppstoreOutlined, 
  SettingOutlined, 
  TeamOutlined,
  CheckSquareOutlined 
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

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
      key: '/workspace/tasks',
      icon: <CheckSquareOutlined />,
      label: 'Tasks',
      onClick: () => navigate('/workspace/tasks')
    },
    {
      key: '/workspace/team',
      icon: <TeamOutlined />,
      label: 'Team Members',
      onClick: () => navigate('/workspace/team')
    },
    {
      key: '/workspace/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/workspace/settings')
    }
  ]

  return (
    <div className="h-100 bg-white border-end d-flex flex-column" style={{ width: '260px' }}>
      <div className="p-3 border-bottom d-flex align-items-center">
        <span className="text-uppercase text-muted fs-7 fw-bold tracking-wider px-2" style={{ fontSize: '11px', letterSpacing: '1px' }}>
          Workspace Menu
        </span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-0 flex-grow-1 pt-2"
      />
    </div>
  )
}

export default Sidebar