import React, { useState } from 'react'
import { Typography, Card, Form, Input, Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography
const { Item } = Form

const AdminSettings = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

  const handleUpdateProfile = (values) => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      window.toastify("Admin settings updated successfully!", "success")
    }, 1000)
  }

  return (
    <div className="p-2" style={{ maxWidth: '700px' }}>
      <div className="mb-4">
        <Title level={2} className="fw-bold mb-1" style={{ color: '#0f172a' }}>Admin Settings</Title>
        <Paragraph className="text-muted">Manage your administrator account credentials and preferences.</Paragraph>
      </div>

      <Card className="shadow-sm border-0 rounded-3">
        <Form 
          layout="vertical" 
          initialValues={{ name: currentUser.name || '', email: currentUser.email || '' }}
          onFinish={handleUpdateProfile}
        >
          <Item label={<span className="fw-medium">Admin Name</span>} name="name" className="mb-3">
            <Input size="large" prefix={<UserOutlined className="text-muted me-2" />} className="rounded-2" />
          </Item>

          <Item label={<span className="fw-medium">Email Address</span>} name="email" className="mb-3">
            <Input size="large" disabled className="rounded-2" />
          </Item>

          <Item label={<span className="fw-medium">New Password</span>} name="password" className="mb-4">
            <Input.Password size="large" placeholder="Leave blank to keep current password" prefix={<LockOutlined className="text-muted me-2" />} className="rounded-2" />
          </Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            size="large"
            loading={isProcessing}
            style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
          >
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default AdminSettings