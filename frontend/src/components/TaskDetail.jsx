import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/tasks/${id}`);
      setTask(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch task');
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading task...</p>
      </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (!task) return <Alert variant="warning">Task not found</Alert>;

  return (
    <div className="container mt-4">
      <Card>
        <Card.Header>
          <h4>📌 Task Detail</h4>
        </Card.Header>
        <Card.Body>
          <h5>{task.title}</h5>
          <p>
            <strong>Description:</strong> {task.description || '-'}
          </p>
          <p>
            <strong>Status:</strong> <span className={`badge ${task.status === 'completed' ? 'bg-success' : task.status === 'pending' ? 'bg-warning text-dark' : 'bg-secondary'}`}>{task.status}</span>
          </p>
          <p>
            <strong>Due Date:</strong> {task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}
          </p>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            ⬅ Back
          </Button>
          <Button variant="warning" onClick={() => navigate(`/update-task/${task.id}`)}>
            ✏ Edit
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
