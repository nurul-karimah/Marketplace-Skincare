import { Routes, Route } from 'react-router-dom';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import TaskEdit from './components/TasksEdit';
import Home from './components/TaskDetail';

export default function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
