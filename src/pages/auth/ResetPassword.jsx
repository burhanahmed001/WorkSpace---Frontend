import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const { Title } = Typography
const { Item } = Form

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const { token } = useParams()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      return window.toastify("Password must be at least 6 characters long", "error")
    }

    if (password !== confirmPassword) {
      return window.toastify("Passwords do not match", "error")
    }

    setIsProcessing(true)

    // Fixed: Changed axios.post to axios.put to match backend route method
    axios.put(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`, { newPassword: password })
      .then(({ status, data }) => {
        if (status === 200 || status === 201) {
          window.toastify(data.message || "Password reset successfully!", "success")
          navigate('/auth/login') 
        }
      })
      .catch(error => {
        console.error("error response data:", error.response?.data)
        const errorMsg = error.response?.data?.message || error.response?.data?.error || "Something went wrong. Try again."
        window.toastify(errorMsg, "error")
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main className='auth d-flex align-items-center justify-content-center min-vh-100 p-3'>
      <div className="card border-0 shadow-sm p-4" style={{ maxWidth: '420px', width: '100%', borderRadius: '16px' }}>
        <Title level={2} className='text-center mb-2 fw-bold' style={{ color: '#0f172a' }}>
          Reset Password
        </Title>
        <p className="text-center text-muted mb-4 fs-6">
          Enter your new password below.
        </p>
        
        <Form layout='vertical' onSubmitCapture={handleSubmit}>
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <Item label={<span className="fw-medium text-secondary">New Password</span>} required className="mb-3">
                <Input.Password 
                  size='large' 
                  placeholder='Enter new password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                  className="rounded-3"
                />
              </Item>
            </Col>

            <Col span={24}>
              <Item label={<span className="fw-medium text-secondary">Confirm Password</span>} required className="mb-3">
                <Input.Password 
                  size='large' 
                  placeholder='Confirm new password' 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className="rounded-3"
                />
              </Item>
            </Col>

            <Col span={24} className="mt-2">
              <Button 
                type='primary' 
                block 
                htmlType='submit' 
                size='large'
                loading={isProcessing}
                className="btn-submit rounded-3 fw-semibold"
                style={{ height: '42px', backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
              >
                Reset Password
              </Button>
            </Col>

            <Col span={24} className="text-center mt-3">
              <p className="mb-0 text-muted fs-6">
                Remember your password?{' '}
                <Link to="/auth/login" className="auth-link fw-semibold" style={{ color: '#4f46e5' }}>
                  Login here
                </Link>
              </p>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  )
}

export default ResetPassword