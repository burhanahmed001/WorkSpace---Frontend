import React, { useState } from 'react'
import { Typography, Table, Button, Modal, Form, Input, Tag } from 'antd'

const { Title, Paragraph } = Typography
const { Item } = Form

const ProjectView = () => {
  const [projects, setProjects] = useState([
    { key: '1', name: 'Workspace Manager App', category: 'Fullstack MERN', status: 'In Progress', deadline: '2026-06-30' },
    { key: '2', name: 'E-commerce Admin Dashboard', category: 'React & Node', status: 'Completed', deadline: '2026-05-15' }
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('In Progress')
  const [deadline, setDeadline] = useState('')

  const handleAddProject = (e) => {
    e.preventDefault()
    if (!projectName.trim()) return

    const newProject = {
      key: Date.now().toString(),
      name: projectName,
      category: category || 'General',
      status: status,
      deadline: deadline || 'N/A'
    }

    setProjects([...projects, newProject])
    setProjectName('')
    setCategory('')
    setDeadline('')
    setIsModalVisible(false)
  }

  const columns = [
    { title: 'Project Name', dataIndex: 'name', key: 'name', render: (text) => <span className="fw-semibold text-dark">{text}</span> },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => {
        let color = status === 'Completed' ? 'success' : status === 'In Progress' ? 'processing' : 'default'
        return <Tag color={color}>{status}</Tag>
      }
    },
    { title: 'Deadline', dataIndex: 'deadline', key: 'deadline' }
  ]

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Title level={2} className="fw-bold mb-1" style={{ color: '#0f172a' }}>Projects</Title>
          <Paragraph className="text-muted mb-0">View and organize all active projects in this workspace.</Paragraph>
        </div>
        <Button 
          type="primary" 
          size="large" 
          onClick={() => setIsModalVisible(true)}
          style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
        >
          + Create Project
        </Button>
      </div>

      <Table 
        dataSource={projects} 
        columns={columns} 
        className="shadow-sm rounded-3 overflow-hidden border bg-white" 
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={<span className="fw-bold fs-5">Create New Project</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <Form layout="vertical" onSubmitCapture={handleAddProject} className="mt-3">
          <Item label={<span className="fw-medium">Project Name</span>} required className="mb-3">
            <Input 
              size="large" 
              placeholder="e.g. Workspace Manager App" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="rounded-3"
            />
          </Item>
          <Item label={<span className="fw-medium">Category</span>} className="mb-3">
            <Input 
              size="large" 
              placeholder="e.g. Fullstack MERN" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-3"
            />
          </Item>
          <Item label={<span className="fw-medium">Deadline</span>} className="mb-4">
            <Input 
              size="large" 
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="rounded-3"
            />
          </Item>
          <Button 
            type="primary" 
            block 
            htmlType="submit" 
            size="large"
            style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
          >
            Save Project
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default ProjectView