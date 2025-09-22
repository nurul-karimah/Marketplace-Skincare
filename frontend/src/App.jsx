import { Routes, Route } from 'react-router-dom';
// import TaskForm from './components/TaskForm';
// import TaskList from './components/TaskList';
// import TaskEdit from './components/TasksEdit';
import Home from './components/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
