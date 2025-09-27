import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/menu'; // pastikan huruf besar sesuai
import About from './component/about';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
}
