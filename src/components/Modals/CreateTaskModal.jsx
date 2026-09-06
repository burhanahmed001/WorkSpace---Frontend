import React, { useState } from 'react'
import { Modal, Input, Select, DatePicker, Button, message } from 'antd'
import { CheckCircleOutlined, CalendarOutlined, FlagOutlined, UserOutlined } from '@ant-design/icons'
import axios from 'axios'

const CreateTaskModal = ({ visible, onCancel, onTaskCreated }) => {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [status, setStatus] = useState('todo')
  const [dueDate, setDueDate] = useState(null)

  const handleSubmit = async () => {
    if (!title.trim()) {
      if (window.toastify) {
        window.toastify("Task title is required", "error")
      } else {
        message.error("Task title is required")
      }
      return
    }

    const token = localStorage.getItem('token')
    const newTask = {
      title,
      description,
      priority,
      status,
      dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : new Date().toISOString().split('T')[0]
    }

    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.status === 201 || response.status === 200) {
        if (window.toastify) {
          window.toastify("Task created successfully", "success")
        } else {
          message.success("Task created successfully")
        }
        
        if (onTaskCreated) {
          onTaskCreated(response.data.task || newTask)
        }
        
        // Reset form & close modal
        setTitle('')
        setDescription('')
        setPriority('Medium')
        setStatus('todo')
        setDueDate(null)
        onCancel()
      }
    } catch (error) {
      console.error("Error creating task:", error?.response)
      if (window.toastify) {
        window.toastify(error?.response?.data?.message || "Failed to create task", "error")
      } else {
        message.error(error?.response?.data?.message || "Failed to create task")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={
        <div className="d-flex align-items-center gap-2 pb-2 border-bottom">
          <CheckCircleOutlined style={{ color: '#4f46e5', fontSize: '20px' }} />
          <span className="fw-bold fs-5 text-dark">Create New Task</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel} className="rounded-2">
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          loading={loading} 
          onClick={handleSubmit}
          style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
          className="rounded-2 fw-medium px-4"
        >
          Create Task
        </Button>
      ]}
      centered
      className="rounded-3 overflow-hidden"
      width={520}
    >
      <div className="d-flex flex-column gap-3 py-3">
        {/* Task Title */}
        <div>
          <label className="form-label fw-semibold small text-dark mb-1">Task Title <span className="text-danger">*</span></label>
          <Input 
            placeholder="e.g., Design landing page layout..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            size="large"
            className="rounded-2"
          />
        </div>

        {/* Task Description */}
        <div>
          <label className="form-label fw-semibold small text-dark mb-1">Description</label>
          <Input.TextArea 
            rows={3} 
            placeholder="Provide a detailed description of the task..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="rounded-2"
          />
        </div>

        <div className="row g-3">
          {/* Priority Selection */}
          <div className="col-md-6">
            <label className="form-label fw-semibold small text-dark mb-1">
              <FlagOutlined className="me-1 text-muted" /> Priority Level
            </label>
            <Select
              value={priority}
              onChange={(value) => setPriority(value)}
              className="w-100"
              size="large"
              options={[
                { value: 'High', label: <span className="text-danger fw-semibold">High Priority</span> },
                { value: 'Medium', label: <span className="text-warning fw-semibold">Medium Priority</span> },
                { value: 'Low', label: <span className="text-success fw-semibold">Low Priority</span> },
              ]}
            />
          </div>

          {/* Status Selection */}
          <div className="col-md-6">
            <label className="form-label fw-semibold small text-dark mb-1">Initial Status</label>
            <Select
              value={status}
              onChange={(value) => setStatus(value)}
              className="w-100"
              size="large"
              options={[
                { value: 'backlog', label: 'Backlog' },
                { value: 'todo', label: 'To Do' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'done', label: 'Done' },
              ]}
            />
          </div>
        </div>

        {/* Due Date Picker */}
        <div>
          <label className="form-label fw-semibold small text-dark mb-1">
            <CalendarOutlined className="me-1 text-muted" /> Due Date
          </label>
          <DatePicker 
            value={dueDate} 
            onChange={(date) => setDueDate(date)} 
            className="w-100 rounded-2"
            size="large"
            placeholder="Select target deadline"
          />
        </div>
      </div>
    </Modal>
  )
}

export default CreateTaskModal