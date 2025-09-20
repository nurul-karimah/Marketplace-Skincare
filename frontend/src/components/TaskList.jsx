import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks?page=1&limit=10');
      setTasks(res.data.task);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    alert('Add Task clicked!');

    navigate('/add-task');
  };

  const handleView = (id) => {
    alert(`View Task ID: ${id}`);
    navigate(`/view-task/${id}`);
  };

  const handleEdit = (id) => {
    alert(`Edit Task ID: ${id}`);
    navigate(`/update-task/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const res = await axios.delete(`http://localhost:5000/tasks/${id}`);
      setSuccess(res.data.message);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete task');
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading tasks...</p>
      </div>
    );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>📋 Task List</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Button variant="primary" onClick={handleAdd}>
          ➕ Add Task
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <span className={`badge ${task.status === 'completed' ? 'bg-success' : task.status === 'pending' ? 'bg-warning text-dark' : 'bg-secondary'}`}>{task.status}</span>
                </td>
                <td>{task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}</td>
                <td className="text-center">
                  <Button variant="info" size="sm" className="me-2" onClick={() => handleView(task.id)}>
                    👁 View
                  </Button>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(task.id)}>
                    ✏ Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>
                    🗑 Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
