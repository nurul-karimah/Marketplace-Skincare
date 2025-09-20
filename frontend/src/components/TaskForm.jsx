import { useState } from 'react';
import { Form, Button, Card, Col, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function TaskForm({ onTaskCreated }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    due_date: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.title) {
      setError('Title is required');
      return;
    }

    try {
      await axios.post('http://localhost:5000/tasks', form);
      setSuccess('Task created successfully!');
      setForm({ title: '', description: '', status: 'pending', due_date: '' });

      // navigasi ke TaskListPage
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create task');
    }
  };

  return (
    <Card style={{ maxWidth: '600px', margin: '20px auto' }}>
      <Card.Body>
        {/* Tombol kembali */}
        <div className="mb-3">
          <Button variant="secondary" onClick={() => navigate('/')}>
            ⬅ Kembali ke List
          </Button>
        </div>

        <Card.Title>Create New Task</Card.Title>

        {error && !success && <Alert variant="danger">{error}</Alert>}
        {success && !error && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" placeholder="Enter task title" value={form.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" placeholder="Enter task description" rows={3} value={form.description} onChange={handleChange} />
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={form.status} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" name="due_date" value={form.due_date} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Create Task
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
