import React, { useState, useEffect } from 'react'
import { Modal, Input, List } from 'antd'
import { 
  SearchOutlined, 
  DashboardOutlined, 
  CheckSquareOutlined, 
  ProjectOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  PlusOutlined 
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const CommandPalette = ({ visible, onClose, onOpenCreateTask, onOpenCreateProject }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (visible) {
          onClose()
        } else {
          // Trigger open if needed via parent handler
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [visible, onClose])

  const actions = [
    {
      id: 'dashboard',
      title: 'Go to Dashboard',
      category: 'Navigation',
      icon: <DashboardOutlined className="text-primary" />,
      perform: () => { navigate('/workspace'); onClose(); }
    },
    {
      id: 'create_task',
      title: 'Create New Task',
      category: 'Actions',
      icon: <CheckSquareOutlined className="text-success" />,
      perform: () => { if (onOpenCreateTask) onOpenCreateTask(); onClose(); }
    },
    {
      id: 'create_project',
      title: 'Create New Project',
      category: 'Actions',
      icon: <ProjectOutlined className="text-warning" />,
      perform: () => { if (onOpenCreateProject) onOpenCreateProject(); onClose(); }
    },
    {
      id: 'settings',
      title: 'Account Settings',
      category: 'Preferences',
      icon: <SettingOutlined className="text-secondary" />,
      perform: () => { navigate('/workspace/settings'); onClose(); }
    },
    {
      id: 'logout',
      title: 'Log out of Workspace',
      category: 'System',
      icon: <LogoutOutlined className="text-danger" />,
      perform: () => { localStorage.removeItem('token'); navigate('/auth/login'); onClose(); }
    }
  ]

  const filteredActions = actions.filter(action => 
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closable={false}
      centered
      className="command-palette-modal rounded-3 overflow-hidden"
      width={600}
      bodyStyle={{ padding: 0 }}
    >
      <div className="p-3 border-bottom bg-light">
        <Input 
          prefix={<SearchOutlined className="text-muted fs-5 me-2" />}
          placeholder="Type a command or search..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          bordered={false}
          autoFocus
          size="large"
          className="fs-6 bg-transparent"
        />
      </div>
      
      <div className="p-2" style={{ maxHeight: '350px', overflowY: 'auto' }}>
        <List
          dataSource={filteredActions}
          locale={{ emptyText: <div className="py-4 text-muted small">No commands found</div> }}
          renderItem={(item) => (
            <div 
              onClick={item.perform}
              className="d-flex align-items-center justify-content-between p-3 rounded-2 cursor-pointer hover-bg-light transition-all mb-1"
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-3">
                <div className="fs-5 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                  {item.icon}
                </div>
                <div>
                  <div className="fw-semibold text-dark">{item.title}</div>
                  <div className="text-muted small" style={{ fontSize: '11px' }}>{item.category}</div>
                </div>
              </div>
              <span className="badge bg-light text-muted border px-2 py-1 rounded small">Select</span>
            </div>
          )}
        />
      </div>

      <div className="px-3 py-2 bg-light border-top d-flex justify-content-between align-items-center text-muted small" style={{ fontSize: '11px' }}>
        <span>Navigate with arrow keys or click</span>
        <span className="fw-semibold">ESC to close</span>
      </div>
    </Modal>
  )
}

export default CommandPalette