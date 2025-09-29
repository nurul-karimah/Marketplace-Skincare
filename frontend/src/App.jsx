import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Produk from './components/produk'; // pastikan huruf besar sesuai
import About from './components/about';
import Book from './components/book';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produk" element={<Produk />} />
      <Route path="/about" element={<About />} />
      <Route path="/book" element={<Book />} />
    </Routes>
  );
}
