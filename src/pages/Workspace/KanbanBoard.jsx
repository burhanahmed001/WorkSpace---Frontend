import React, { useState } from 'react'
import { Typography, Card, Row, Col, Button, Modal, Form, Input, Tag } from 'antd'

const { Title, Paragraph } = Typography
const { Item } = Form

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Setup MERN Backend', status: 'todo', priority: 'High' },
    { id: '2', title: 'Design Auth UI', status: 'inprogress', priority: 'Medium' },
    { id: '3', title: 'Database Connection', status: 'completed', priority: 'High' }
  ])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskPriority, setTaskPriority] = useState('Medium')
  const [selectedStatus, setSelectedStatus] = useState('todo')

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!taskTitle.trim()) return

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      status: selectedStatus,
      priority: taskPriority
    }

    setTasks([...tasks, newTask])
    setTaskTitle('')
    setIsModalVisible(false)
  }

  const columns = [
    { key: 'todo', title: 'To Do', color: '#ef4444' },
    { key: 'inprogress', title: 'In Progress', color: '#f59e0b' },
    { key: 'completed', title: 'Completed', color: '#10b981' }
  ]

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Title level={2} className="fw-bold mb-1" style={{ color: '#0f172a' }}>Kanban Board</Title>
          <Paragraph className="text-muted mb-0">Track task progress and manage workflows visually.</Paragraph>
        </div>
        <Button 
          type="primary" 
          size="large"
          onClick={() => { setSelectedStatus('todo'); setIsModalVisible(true); }}
          style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}
        >
          + Add Task
        </Button>
      </div>
      
      <Row gutter={[16, 16]}>
        {columns.map((col) => (
          <Col xs={24} md={8} key={col.key}>
            <Card 
              title={<span style={{ color: col.color }} className="fw-bold">{col.title}</span>} 
              className="shadow-sm border-0 rounded-3 bg-light h-100"
            >
              <div style={{ minHeight: '300px' }}>
                {tasks.filter(t => t.status === col.key).length === 0 ? (
                  <div className="text-center py-5 text-muted">No tasks in this column</div>
                ) : (
                  tasks.filter(t => t.status === col.key).map(task => (
                    <Card key={task.id} size="small" className="mb-3 shadow-sm border-0 rounded-3">
                      <div className="fw-semibold text-dark mb-2">{task.title}</div>
                      <Tag color={task.priority === 'High' ? 'red' : 'blue'}>{task.priority}</Tag>
                    </Card>
                  ))
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title={<span className="fw-bold fs-5">Add New Task</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <Form layout="vertical" onSubmitCapture={handleAddTask} className="mt-3">
          <Item label={<span className="fw-medium">Task Title</span>} required className="mb-3">
            <Input 
              size="large" 
              placeholder="e.g. Implement JWT verification" 
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
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
            Create Task
          </Button>
        </Form>
      </Modal>
    </div>
  )
}

export default KanbanBoard