import React, { useEffect, useState } from 'react'
import { Typography, Table, Button, Popconfirm, Spin } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Paragraph } = Typography

const ManageUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(data.users || data)
    } catch (error) {
      console.error("Error fetching users:", error.response?.data)
      window.toastify(error.response?.data?.message || "Failed to load users", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      window.toastify("User deleted successfully", "success")
      fetchUsers()
    } catch (error) {
      console.error("Error deleting user:", error.response?.data)
      window.toastify(error.response?.data?.message || "Failed to delete user", "error")
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="fw-semibold">{text || 'N/A'}</span>
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <span className={`badge ${role === 'admin' ? 'bg-danger' : 'bg-primary'} text-capitalize px-2 py-1`}>
          {role || 'Member'}
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Delete User"
          description="Are you sure you want to delete this user?"
          onConfirm={() => handleDeleteUser(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger icon={<DeleteOutlined />} size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ]

  return (
    <div className="p-2">
      <div className="mb-4">
        <Title level2 className="fw-bold mb-1" style={{ color: '#0f172a' }}>Manage Users</Title>
        <Paragraph className="text-muted">View and manage all registered platform users.</Paragraph>
      </div>

      {loading ? (
        <div className="text-center py-5"><Spin size="large" /></div>
      ) : (
        <div className="bg-white p-3 rounded shadow-sm border-0">
          <Table 
            dataSource={users} 
            columns={columns} 
            rowKey="_id" 
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}
    </div>
  )
}

export default ManageUsers