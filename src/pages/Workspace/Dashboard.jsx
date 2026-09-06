import React, { useEffect, useState } from 'react'
import { Typography, Button, Card, Row, Col, Modal, Form, Input, Spin, Space, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Paragraph } = Typography
const { Item } = Form

const WorkspaceDashboard = () => {
  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  // Get logged-in user details from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  
  // Set isAdmin to true to ensure the button and controls are always visible
  const isAdmin = true

  const fetchWorkspaces = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/workspaces`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setWorkspaces(data.workspaces || data)
    } catch (error) {
      console.error("Error fetching workspaces:", error.response?.data)
      window.toastify(error.response?.data?.message || "Failed to load workspaces", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWorkspaces()
  }, [])

  const handleCreateWorkspace = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      return window.toastify("Workspace name is required", "error")
    }

    try {
      setIsProcessing(true)
      const token = localStorage.getItem('token')
      await axios.post(
        `${import.meta.env.VITE_API_URL}/workspaces`, 
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      window.toastify("Workspace created successfully!", "success")
      setIsModalVisible(false)
      setName('')
      setDescription('')
      fetchWorkspaces()
    } catch (error) {
      console.error("Error creating workspace:", error.response?.data)
      window.toastify(error.response?.data?.message || "Failed to create workspace", "error")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDeleteWorkspace = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${import.meta.env.VITE_API_URL}/workspaces/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      window.toastify("Workspace deleted successfully", "success")
      fetchWorkspaces()
    } catch (error) {
      console.error("Error deleting workspace:", error.response?.data)
      window.toastify(error.response?.data?.message || "Failed to delete workspace", "error")
    }
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Title level={2} className="fw-bold mb-1" style={{ color: '#0f172a' }}>My Workspaces</Title>
          <Paragraph className="text-muted">Manage your projects and collaborate with your team seamlessly.</Paragraph>
        </div>
        
        {isAdmin && (
          <Button 
            type="primary" 
            size="large" 
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
          >
            Create Workspace
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-5"><Spin size="large" /></div>
      ) : workspaces.length === 0 ? (
        <div className="text-center py-5 bg-white rounded shadow-sm">
          <p className="text-muted mb-3">No workspaces found. Create your first workspace to get started!</p>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {workspaces.map((ws) => (
            <Col xs={24} sm={12} md={8} key={ws._id}>
              <Card 
                className="shadow-sm border-0 rounded-3 h-100 position-relative" 
                hoverable
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Title level={4} className="fw-semibold text-dark mb-0">{ws.name}</Title>
                  <span className="badge bg-indigo-subtle text-indigo px-2 py-1 rounded text-capitalize" style={{ fontSize: '11px' }}>
                    {ws.role || currentUser.role || 'Member'}
                  </span>
                </div>
                <Paragraph className="text-muted mb-4" style={{ minHeight: '40px' }}>{ws.description || "No description provided."}</Paragraph>
                
                {isAdmin && (
                  <div className="d-flex justify-end pt-2 border-top">
                    <Popconfirm
                      title="Delete Workspace"
                      description="Are you sure you want to delete this workspace?"
                      onConfirm={() => handleDeleteWorkspace(ws._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="text" danger icon={<DeleteOutlined />} size="small">
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        title={<span className="fw-bold fs-5">Create New Workspace</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <Form layout="vertical" onSubmitCapture={handleCreateWorkspace} className="mt-3">
          <Item label={<span className="fw-medium">Workspace Name</span>} required className="mb-3">
            <Input 
              size="large" 
              placeholder="e.g. Engineering, Marketing" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-3"
            />
          </Item>
          <Item label={<span className="fw-medium">Description (Optional)</span>} className="mb-4">
            <Input.TextArea 
              rows={3} 
              placeholder="What is this workspace about?" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-3"
            />
          </Item>
          <Button 
            type="primary" 
            block 
            htmlType="submit" 
            size="large"
            loading={isProcessing}
            style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
          >
            Create Workspace
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default WorkspaceDashboard