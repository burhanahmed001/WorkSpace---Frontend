import React, { useState } from 'react'
import { Typography, Form, Input, Button, Divider } from 'antd'

const { Title, Paragraph } = Typography
const { Item } = Form

const Settings = () => {
  const [workspaceName, setWorkspaceName] = useState('My Workspace')
  const [description, setDescription] = useState('A default workspace for managing MERN stack projects and tasks.')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUpdate = (e) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      window.toastify("Workspace settings updated successfully!", "success")
    }, 1000)
  }

  const handleDeleteWorkspace = () => {
    setIsDeleting(true)
    setTimeout(() => {
      setIsDeleting(false)
      window.toastify("Workspace deleted successfully!", "success")
    }, 1000)
  }

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white rounded-3 shadow-sm border mt-4">
      <Title level={2} className="fw-bold mb-1" style={{ color: '#0f172a' }}>Workspace Settings</Title>
      <Paragraph className="text-muted mb-4">Manage your workspace preferences, general details, and system configurations.</Paragraph>

      <Form layout="vertical" onSubmitCapture={handleUpdate}>
        <Item label={<span className="fw-medium text-secondary">Workspace Name</span>} className="mb-3">
          <Input 
            size="large" 
            value={workspaceName} 
            onChange={(e) => setWorkspaceName(e.target.value)} 
            className="rounded-3"
          />
        </Item>
        
        <Item label={<span className="fw-medium text-secondary">Description</span>} className="mb-4">
          <Input.TextArea 
            rows={3} 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="rounded-3"
          />
        </Item>

        <Button 
          type="primary" 
          htmlType="submit" 
          size="large"
          loading={isProcessing}
          style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
          className="fw-semibold rounded-3"
        >
          Save Changes
        </Button>
      </Form>

      <Divider className="my-5" />

      <div>
        <Title level={4} className="text-danger fw-bold mb-1">Danger Zone</Title>
        <Paragraph className="text-muted mb-3">Once you delete a workspace, there is no going back. Please be certain.</Paragraph>
        <Button 
          danger 
          type="primary" 
          size="large" 
          loading={isDeleting}
          onClick={handleDeleteWorkspace}
          className="fw-semibold rounded-3"
        >
          Delete Workspace
        </Button>
      </div>
    </div>
  )
}

export default Settings