import { useState, useEffect } from 'react';
import { Form, Button, Card, Col, Row, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    due_date: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Ambil data task berdasarkan ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/tasks/${id}`);
        const task = res.data;

        setForm({
          title: task.title || '',
          description: task.description || '',
          status: task.status || 'pending',
          due_date: task.due_date ? task.due_date.split('T')[0] : '',
        });
      } catch (err) {
        setError('Failed to load task');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, form);
      setSuccess('Task updated successfully!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update task');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading task...</p>
      </div>
    );
  }

  return (
    <Card style={{ maxWidth: '600px', margin: '20px auto' }}>
      <Card.Body>
        <Card.Title>Edit Task</Card.Title>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={form.title} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" rows={3} value={form.description} onChange={handleChange} />
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
            Update Task
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
