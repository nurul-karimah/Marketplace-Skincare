import { Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskEdit from './components/TasksEdit';
import TaskDetail from './components/TaskDetail';

export default function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<TaskForm />} />
        <Route path="/update-task/:id" element={<TaskEdit />} />
        <Route path="/view-task/:id" element={<TaskDetail />} />
      </Routes>
    </div>
  );
}
