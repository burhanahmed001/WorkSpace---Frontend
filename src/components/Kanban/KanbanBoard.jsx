import React, { useState } from 'react'
import { Card, Button, Input, Modal, Tag, Space, Avatar, Dropdown } from 'antd'
import { 
  PlusOutlined, 
  MoreOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  UserOutlined
} from '@ant-design/icons'

const KanbanBoard = () => {
  const [columns, setColumns] = useState([
    {
      id: 'backlog',
      title: 'Backlog',
      color: '#64748b',
      tasks: [
        { id: 't1', title: 'Define API contract specs', description: 'Review endpoints with frontend team', priority: 'High', assignee: 'Burhan', dueDate: '2026-06-15' },
        { id: 't2', title: 'Update documentation', description: 'Document authentication workflow', priority: 'Low', assignee: 'Ali', dueDate: '2026-06-18' }
      ]
    },
    {
      id: 'todo',
      title: 'To Do',
      color: '#3b82f6',
      tasks: [
        { id: 't3', title: 'Setup MongoDB schemas', description: 'Create user and workspace models', priority: 'High', assignee: 'Burhan', dueDate: '2026-06-10' }
      ]
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      color: '#f59e0b',
      tasks: [
        { id: 't4', title: 'Design Workspace UI', description: 'Build dashboard layout with Ant Design', priority: 'Medium', assignee: 'Sara', dueDate: '2026-06-12' }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      color: '#10b981',
      tasks: [
        { id: 't5', title: 'Initial Project Setup', description: 'Configure Vite, React Router, and Bootstrap', priority: 'High', assignee: 'Burhan', dueDate: '2026-06-05' }
      ]
    }
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [activeColumnId, setActiveColumnId] = useState(null)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDesc, setTaskDesc] = useState('')
  const [taskPriority, setTaskPriority] = useState('Medium')
  const [taskAssignee, setTaskAssignee] = useState('Burhan')
  const [taskDueDate, setTaskDueDate] = useState('')

  const showModal = (columnId) => {
    setActiveColumnId(columnId)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setTaskTitle('')
    setTaskDesc('')
    setTaskPriority('Medium')
    setTaskAssignee('Burhan')
    setTaskDueDate('')
  }

  const handleAddTask = () => {
    if (!taskTitle.trim()) return

    const newTask = {
      id: `t_${Date.now()}`,
      title: taskTitle,
      description: taskDesc,
      priority: taskPriority,
      assignee: taskAssignee || 'Burhan',
      dueDate: taskDueDate || new Date().toISOString().split('T')[0]
    }

    setColumns(columns.map(col => {
      if (col.id === activeColumnId) {
        return { ...col, tasks: [...col.tasks, newTask] }
      }
      return col
    }))

    handleCancel()
  }

  const handleDeleteTask = (columnId, taskId) => {
    setColumns(columns.map(col => {
      if (col.id === columnId) {
        return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) }
      }
      return col
    }))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'red'
      case 'Medium': return 'orange'
      case 'Low': return 'green'
      default: return 'blue'
    }
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Kanban Board</h2>
          <p className="text-muted small mb-0">Manage tasks, track progress, and organize workspace workflow.</p>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="row g-4 flex-nowrap overflow-auto pb-4" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {columns.map(column => (
          <div key={column.id} className="col-12 col-md-4 col-xl-3" style={{ minWidth: '300px' }}>
            <div className="card border-0 shadow-sm bg-light h-100 rounded-3">
              {/* Column Header */}
              <div className="card-header bg-white border-bottom p-3 d-flex justify-content-between align-items-center rounded-top-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="dot rounded-circle" style={{ width: '10px', height: '10px', backgroundColor: column.color }}></span>
                  <span className="fw-bold text-dark">{column.title}</span>
                  <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-2">
                    {column.tasks.length}
                  </span>
                </div>
                <Button 
                  type="text" 
                  icon={<PlusOutlined />} 
                  size="small"
                  className="text-primary fw-semibold"
                  onClick={() => showModal(column.id)}
                />
              </div>

              {/* Tasks List */}
              <div className="card-body p-3 d-flex flex-column gap-3 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
                {column.tasks.length === 0 ? (
                  <div className="text-center py-4 text-muted small border border-dashed rounded-2 bg-white">
                    No tasks yet
                  </div>
                ) : (
                  column.tasks.map(task => (
                    <div key={task.id} className="card border-0 shadow-sm bg-white p-3 rounded-3 position-relative hover-shadow">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Tag color={getPriorityColor(task.priority)} className="m-0 border-0 fw-semibold">
                          {task.priority}
                        </Tag>
                        <Button 
                          type="text" 
                          icon={<DeleteOutlined />} 
                          size="small" 
                          className="text-muted p-0 h-auto hover-text-danger"
                          onClick={() => handleDeleteTask(column.id, task.id)}
                        />
                      </div>
                      <h6 className="fw-bold text-dark mb-1">{task.title}</h6>
                      <p className="text-muted small mb-3">{task.description}</p>
                      
                      {/* Due Date Badge */}
                      {task.dueDate && (
                        <div className="mb-2 text-muted small d-flex align-items-center gap-1">
                          <CalendarOutlined style={{ fontSize: '12px' }} />
                          <span>Due: {task.dueDate}</span>
                        </div>
                      )}

                      <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                        <span className="text-muted small">{task.assignee || 'Unassigned'}</span>
                        <Avatar size="small" style={{ backgroundColor: '#4f46e5' }}>
                          {task.assignee ? task.assignee.charAt(0) : 'U'}
                        </Avatar>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Column Footer Action */}
              <div className="card-footer bg-white border-top p-2 rounded-bottom-3 text-center">
                <Button 
                  type="dashed" 
                  block 
                  icon={<PlusOutlined />} 
                  onClick={() => showModal(column.id)}
                  className="border-0 text-muted fw-medium"
                >
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal with Enhanced Details */}
      <Modal
        title={<span className="fw-bold">Create New Task</span>}
        open={isModalVisible}
        onOk={handleAddTask}
        onCancel={handleCancel}
        okText="Create Task"
        okButtonProps={{ style: { backgroundColor: '#4f46e5', borderColor: '#4f46e5' } }}
        centered
      >
        <div className="d-flex flex-column gap-3 py-3">
          <div>
            <label className="form-label fw-semibold small text-muted">Task Title *</label>
            <Input 
              placeholder="Enter task title..." 
              value={taskTitle} 
              onChange={(e) => setTaskTitle(e.target.value)} 
              size="large"
            />
          </div>
          <div>
            <label className="form-label fw-semibold small text-muted">Description</label>
            <Input.TextArea 
              rows={3} 
              placeholder="Enter task description..." 
              value={taskDesc} 
              onChange={(e) => setTaskDesc(e.target.value)} 
            />
          </div>
          <div className="row g-2">
            <div className="col-6">
              <label className="form-label fw-semibold small text-muted">Priority Level</label>
              <select 
                className="form-select" 
                value={taskPriority} 
                onChange={(e) => setTaskPriority(e.target.value)}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label fw-semibold small text-muted">Assignee</label>
              <Input 
                placeholder="Assignee name..." 
                value={taskAssignee} 
                onChange={(e) => setTaskAssignee(e.target.value)} 
              />
            </div>
          </div>
          <div>
            <label className="form-label fw-semibold small text-muted">Due Date</label>
            <input 
              type="date" 
              className="form-control" 
              value={taskDueDate} 
              onChange={(e) => setTaskDueDate(e.target.value)} 
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default KanbanBoard