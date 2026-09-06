import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const { Title } = Typography
const { Item } = Form

const Login = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    let { email, password } = values
    email = email.trim()

    if (!window.isValidEmail(email)) { 
      return window.toastify("Please enter a valid email address", "error") 
    }
    if (password.length < 6) { 
      return window.toastify("Password must be at least 6 characters.", "error") 
    }

    const credentials = { email, password }
    setIsProcessing(true)

    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials)
      .then(({ status, data }) => {
        if (status === 200) {
          const { message, token, role, name, email: userEmail, _id } = data
          const userData = { _id, name, email: userEmail, role }

          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify(userData))

          window.toastify(message || "Login successful!", "success")

          // Role-based redirection: Admin goes to admin panel, Member goes to workspace
          if (role === "admin") {
            navigate("/admin/dashboard")
          } else {
            navigate("/workspace") 
          }
        }
      })
      .catch(error => {
        console.error("error", error)
        const errorMsg = error.response?.data?.message || "Invalid email or password."
        window.toastify(errorMsg, "error")
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main className='auth d-flex justify-content-center align-items-center min-vh-100 p-4 bg-light'>
      <div className="card p-4 shadow-sm border-0 rounded-4 bg-white" style={{ width: '100%', maxWidth: '480px' }}>
        <Title level={2} className='text-center mb-4 fw-bold' style={{ color: '#1e293b' }}>Login</Title>
        <Form layout='vertical' onFinish={onFinish}>
          <Row gutter={[0, 12]}>
            <Col span={24}>
              <Item 
                name="email"
                label={<span className="fw-semibold text-dark">Email</span>} 
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input 
                  type="email" 
                  size='large' 
                  placeholder='Enter your email address' 
                  className="rounded-2"
                />
              </Item>
            </Col>

            <Col span={24}>
              <Item 
                name="password"
                label={<span className="fw-semibold text-dark">Password</span>} 
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password 
                  size='large' 
                  placeholder='Enter your password' 
                  className="rounded-2"
                />
              </Item>
            </Col>

            <Col span={24} className="text-end mb-1">
              <Link to="/auth/forgot-password" className="text-decoration-none text-primary fw-medium" style={{ fontSize: '13px' }}>
                Forgot Password?
              </Link>
            </Col>

            <Col span={24} className="mt-2">
              <Button 
                type='primary' 
                block 
                htmlType='submit' 
                size='large'
                loading={isProcessing}
                className="rounded-2 fw-semibold shadow-sm"
                style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5', height: '45px' }}
              >
                Login
              </Button>
            </Col>

            <Col span={24} className="text-center mt-3">
              <p className="mb-0 text-muted" style={{ fontSize: '14px' }}>
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-primary fw-semibold text-decoration-none">
                  Register here
                </Link>
              </p>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  )
}

export default Login