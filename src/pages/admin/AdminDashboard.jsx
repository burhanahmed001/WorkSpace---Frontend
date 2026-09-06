import React, { useEffect, useState } from 'react'
import { Typography, Row, Col, Card, Statistic, Spin } from 'antd'
import { UserOutlined, AppstoreOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Paragraph } = Typography

const AdminDashboard = () => {
  // Initial keys ko backend ke mutabiq set kar diya hai
  const [stats, setStats] = useState({ totalUsers: 0, totalWorkspaces: 0 })
  const [loading, setLoading] = useState(true)

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(data)
    } catch (error) {
      console.error("Error fetching admin stats:", error.response?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminStats()
  }, [])

  return (
    <div className="p-2">
      <div className="mb-4">
        <Title level={2} className="fw-bold mb-1" style={{ color: '#0f172a' }}>
          Welcome back, {currentUser.name || 'Admin'}! 👋
        </Title>
        <Paragraph className="text-muted">
          Here is a quick overview of the system activities and platform statistics.
        </Paragraph>
      </div>

      {loading ? (
        <div className="text-center py-5"><Spin size="large" /></div>
      ) : (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card className="shadow-sm border-0 rounded-3" hoverable>
              <Statistic 
                title={<span className="fw-semibold text-muted">Total Users</span>} 
                value={stats.totalUsers || 0} // Yahan totalUsers kar diya hai
                prefix={<UserOutlined className="text-primary me-2" />} 
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="shadow-sm border-0 rounded-3" hoverable>
              <Statistic 
                title={<span className="fw-semibold text-muted">Total Workspaces</span>} 
                value={stats.totalWorkspaces || 0} // Yahan totalWorkspaces kar diya hai
                prefix={<AppstoreOutlined className="text-success me-2" />} 
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className="shadow-sm border-0 rounded-3" hoverable>
              <Statistic 
                title={<span className="fw-semibold text-muted">System Role</span>} 
                value="Super Admin" 
                prefix={<SafetyCertificateOutlined className="text-danger me-2" />} 
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default AdminDashboard