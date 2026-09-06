import React, { useState } from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const { Title } = Typography
const { Item } = Form


const initialState = { name: "", email: "", password: "", confirmPassword: "" }

const Register = () => {
  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const navigate = useNavigate()

  const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()

    let { name, email, password, confirmPassword } = state

    name = name.trim()
    email = email.trim()

    if (name.length < 3) { return window.toastify("Please enter your full name", "error") }
    if (!window.isValidEmail(email)) { return window.toastify("Please enter a valid email address", "error") }
    if (password.length < 6) { return window.toastify("Password must be at least 6 characters.", "error") }
    if (confirmPassword !== password) { return window.toastify("Passwords do not match", "error") }

    
    const user = { name, email, password, confirmPassword }

    setIsProcessing(true)

   axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, user)
      .then(({ status, data }) => {
        if (status === 201) {
          const { message } = data
          window.toastify(message, "success")
          navigate("/auth/login")
        }
      })
      .catch(error => {
        console.error("error response data:", error.response?.data)
        const errorMsg = error.response?.data?.message || error.response?.data?.error || "User not registered."
        window.toastify(errorMsg, "error")
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  return (
    <main className='auth d-flex align-items-center justify-content-center min-vh-100 p-3'>
      <div className="card border-0 shadow-sm p-4" style={{ maxWidth: '420px', width: '100%', borderRadius: '16px' }}>
        <Title level={2} className='text-center mb-3 fw-bold' style={{ color: '#0f172a' }}>
          Register
        </Title>
        <Form layout='vertical' onSubmitCapture={handleSubmit}>
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <Item label={<span className="fw-medium text-secondary">Full Name</span>} required className="mb-1">
                <Input 
                  type="text" 
                  size='large' 
                  placeholder='Enter your full name' 
                  name='name' 
                  value={state.name} // 
                  onChange={handleChange} 
                  className="rounded-3"
                />
              </Item>
            </Col>

            <Col span={24}>
              <Item label={<span className="fw-medium text-secondary">Email</span>} required className="mb-1">
                <Input 
                  type="email" 
                  size='large' 
                  placeholder='Enter your email address' 
                  name='email' 
                  value={state.email}
                  onChange={handleChange} 
                  className="rounded-3"
                />
              </Item>
            </Col>

            <Col span={24}>
              <Item label={<span className="fw-medium text-secondary">Password</span>} required className="mb-1">
                <Input.Password 
                  size='large' 
                  placeholder='Enter your password' 
                  name='password' 
                  value={state.password}
                  onChange={handleChange} 
                  className="rounded-3"
                />
              </Item>
            </Col>

            <Col span={24}>
              <Item label={<span className="fw-medium text-secondary">Confirm Password</span>} required className="mb-2">
                <Input.Password 
                  size='large' 
                  placeholder='Enter your password again' 
                  name='confirmPassword' 
                  value={state.confirmPassword}
                  onChange={handleChange} 
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
                Register
              </Button>
            </Col>

            <Col span={24} className="text-center mt-3">
              <p className="mb-0 text-muted fs-6">
                Already have an account?{' '}
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

export default Register