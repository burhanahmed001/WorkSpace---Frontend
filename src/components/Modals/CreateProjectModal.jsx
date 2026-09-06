import React, { useState } from 'react'
import { Modal, Input, Select, Button, message } from 'antd'
import { ProjectOutlined, TeamOutlined } from '@ant-design/icons'
import axios from 'axios'

const CreateProjectModal = ({ visible, onCancel, onProjectCreated }) => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Development')

  const handleSubmit = async () => {
    if (!name.trim()) {
      if (window.toastify) {
        window.toastify("Project name is required", "error")
      } else {
        message.error("Project name is required")
      }
      return
    }

    const token = localStorage.getItem('token')
    const newProject = {
      name,
      description,
      category
    }

    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/projects`, newProject, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.status === 201 || response.status === 200) {
        if (window.toastify) {
          window.toastify("Project created successfully", "success")
        } else {
          message.success("Project created successfully")
        }
        
        if (onProjectCreated) {
          onProjectCreated(response.data.project || newProject)
        }
        
        setName('')
        setDescription('')
        setCategory('Development')
        onCancel()
      }
    } catch (error) {
      console.error("Error creating project:", error?.response)
      if (window.toastify) {
        window.toastify(error?.response?.data?.message || "Failed to create project", "error")
      } else {
        message.error(error?.response?.data?.message || "Failed to create project")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={
        <div className="d-flex align-items-center gap-2 pb-2 border-bottom">
          <ProjectOutlined style={{ color: '#4f46e5', fontSize: '20px' }} />
          <span className="fw-bold fs-5 text-dark">Create New Project</span>
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
          Create Project
        </Button>
      ]}
      centered
      className="rounded-3 overflow-hidden"
      width={520}
    >
      <div className="d-flex flex-column gap-3 py-3">
        <div>
          <label className="form-label fw-semibold small text-dark mb-1">Project Name <span className="text-danger">*</span></label>
          <Input 
            placeholder="e.g., Workspace Manager Enterprise..." 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            size="large"
            className="rounded-2"
          />
        </div>

        <div>
          <label className="form-label fw-semibold small text-dark mb-1">Description</label>
          <Input.TextArea 
            rows={3} 
            placeholder="Describe the main goals and scope of this project..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="rounded-2"
          />
        </div>

        <div>
          <label className="form-label fw-semibold small text-dark mb-1">
            <TeamOutlined className="me-1 text-muted" /> Category
          </label>
          <Select
            value={category}
            onChange={(value) => setCategory(value)}
            className="w-100"
            size="large"
            options={[
              { value: 'Development', label: 'Software Development' },
              { value: 'Design', label: 'UI/UX Design' },
              { value: 'Marketing', label: 'Marketing & Growth' },
              { value: 'Operations', label: 'Operations & Management' },
            ]}
          />
        </div>
      </div>
    </Modal>
  )
}

export default CreateProjectModal