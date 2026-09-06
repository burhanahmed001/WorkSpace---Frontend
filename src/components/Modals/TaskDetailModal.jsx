import React from 'react'
import { Modal, Tag, Avatar, Button, Descriptions, Divider } from 'antd'
import { 
  FileTextOutlined, 
  CalendarOutlined, 
  UserOutlined, 
  FlagOutlined, 
  CheckCircleOutlined,
  EditOutlined 
} from '@ant-design/icons'

const TaskDetailModal = ({ visible, onCancel, task, onEdit }) => {
  if (!task) return null

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'red'
      case 'medium': return 'orange'
      case 'low': return 'green'
      default: return 'blue'
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'backlog': return { text: 'Backlog', color: 'default' }
      case 'todo': return { text: 'To Do', color: 'processing' }
      case 'in_progress': return { text: 'In Progress', color: 'warning' }
      case 'done': return { text: 'Done', color: 'success' }
      default: return { text: status, color: 'default' }
    }
  }

  const statusInfo = getStatusBadge(task.status)

  return (
    <Modal
      title={
        <div className="d-flex align-items-center gap-2 pb-2 border-bottom">
          <FileTextOutlined style={{ color: '#4f46e5', fontSize: '20px' }} />
          <span className="fw-bold fs-5 text-dark">Task Details</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel} className="rounded-2">
          Close
        </Button>,
        onEdit && (
          <Button 
            key="edit" 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => { onCancel(); onEdit(task); }}
            style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
            className="rounded-2 fw-medium"
          >
            Edit Task
          </Button>
        )
      ]}
      centered
      className="rounded-3 overflow-hidden"
      width={560}
    >
      <div className="py-3">
        {/* Title & Tags */}
        <div className="mb-3">
          <div className="d-flex gap-2 mb-2">
            <Tag color={getPriorityColor(task.priority)} className="m-0 border-0 fw-semibold px-2 py-0.5 rounded-pill">
              {task.priority || 'Medium'} Priority
            </Tag>
            <Tag color={statusInfo.color} className="m-0 fw-semibold px-2 py-0.5 rounded-pill">
              {statusInfo.text}
            </Tag>
          </div>
          <h4 className="fw-bold text-dark mb-1">{task.title}</h4>
        </div>

        <Divider className="my-3" />

        {/* Description Section */}
        <div className="mb-4">
          <h6 className="fw-semibold text-secondary small text-uppercase tracking-wider mb-2">Description</h6>
          <div className="p-3 bg-light rounded-3 text-dark small" style={{ minHeight: '80px', whiteSpace: 'pre-wrap' }}>
            {task.description || 'No description provided for this task.'}
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="row g-3">
          <div className="col-6">
            <div className="p-3 border rounded-3 bg-white">
              <div className="text-muted small mb-1 d-flex align-items-center gap-1">
                <CalendarOutlined /> Due Date
              </div>
              <div className="fw-semibold text-dark">
                {task.dueDate || 'Not specified'}
              </div>
            </div>
          </div>

          <div className="col-6">
            <div className="p-3 border rounded-3 bg-white">
              <div className="text-muted small mb-1 d-flex align-items-center gap-1">
                <UserOutlined /> Assignee
              </div>
              <div className="d-flex align-items-center gap-2">
                <Avatar size="small" style={{ backgroundColor: '#4f46e5' }}>
                  {task.assignee ? task.assignee.charAt(0).toUpperCase() : 'U'}
                </Avatar>
                <span className="fw-semibold text-dark text-truncate">
                  {task.assignee || 'Unassigned'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TaskDetailModal