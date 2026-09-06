import React from 'react'
import { Card, Tag, Avatar, Button, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons'

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'red'
      case 'medium': return 'orange'
      case 'low': return 'green'
      default: return 'blue'
    }
  }

  return (
    <div className="card border-0 shadow-sm bg-white p-3 rounded-3 position-relative hover-shadow mb-3 transition-all">
      <div className="d-flex justify-content-between align-items-start mb-2">
        <Tag color={getPriorityColor(task?.priority)} className="m-0 border-0 fw-semibold px-2 py-0.5 rounded-pill">
          {task?.priority || 'Normal'}
        </Tag>
        <div className="d-flex gap-1">
          {onEdit && (
            <Tooltip title="Edit Task">
              <Button 
                type="text" 
                icon={<EditOutlined />} 
                size="small" 
                className="text-muted p-0 h-auto hover-text-primary"
                onClick={() => onEdit(task)}
              />
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Delete Task">
              <Button 
                type="text" 
                icon={<DeleteOutlined />} 
                size="small" 
                className="text-muted p-0 h-auto hover-text-danger ms-1"
                onClick={() => onDelete(task.id)}
              />
            </Tooltip>
          )}
        </div>
      </div>

      <h6 className="fw-bold text-dark mb-1 text-truncate">{task?.title || 'Untitled Task'}</h6>
      <p className="text-muted small mb-3 text-secondary" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {task?.description || 'No description provided for this task.'}
      </p>

      <div className="d-flex justify-content-between align-items-center pt-2 border-top">
        <div className="d-flex align-items-center gap-1 text-muted small">
          <ClockCircleOutlined style={{ fontSize: '12px' }} />
          <span>{task?.dueDate || 'Today'}</span>
        </div>
        <Tooltip title={`Assigned to: ${task?.assignee || 'Unassigned'}`}>
          <Avatar size="small" style={{ backgroundColor: '#4f46e5' }} icon={<UserOutlined />}>
            {task?.assignee ? task.assignee.charAt(0).toUpperCase() : 'U'}
          </Avatar>
        </Tooltip>
      </div>
    </div>
  )
}

export default TaskCard