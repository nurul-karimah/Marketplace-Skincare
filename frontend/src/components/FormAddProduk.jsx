// src/pages/AddProduct.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroBg from '../assets/images/hero-bg.jpg'; // import gambar

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    review: '',
    categoryId: '',
    photo: null,
    stok: '',
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/getCategori');
        setCategories(res.data);
      } catch (err) {
        console.error('Gagal ambil kategori:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('price', form.price);
      data.append('description', form.description);
      data.append('review', form.review || ''); // opsional
      data.append('categoryId', form.categoryId);
      data.append('stok', form.stok); // ✅ tambahkan ini
      if (form.photo) data.append('photo', form.photo);

      await axios.post('http://localhost:5000/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage({ type: 'success', text: 'Produk berhasil ditambahkan!' });

      // redirect setelah 3 detik
      setTimeout(() => {
        navigate('/DataProduk');
      }, 3000);
    } catch (err) {
      console.error('Gagal menambah produk:', err);
      setMessage({ type: 'error', text: 'Gagal menambah produk, coba lagi.' });
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Bagian kiri */}
      <div className="d-flex justify-content-center align-items-center text-white" style={{ width: '35%', backgroundColor: '#000' }}>
        <h2 className="fw-bold">Natural Nusantara</h2>
      </div>

      {/* Bagian kanan */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          width: '65%',
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="p-4 rounded"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,192,203,0.9))',
            width: '80%',
            maxWidth: '500px',
            color: 'black',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          <h3 className="mb-4 text-center fw-bold">Tambah Produk</h3>

          {message.text && <div className={`mb-4 px-4 py-2 rounded text-center ${message.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'}`}>{message.text}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nama Produk</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Harga</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <textarea name="description" value={form.description} onChange={handleChange} className="form-control"></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Kategori</label>
              <select name="categoryId" value={form.categoryId} onChange={handleChange} className="form-select" required>
                <option value="">-- Pilih Kategori --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="stok" className="form-label">
                Stok Produk
              </label>
              <input type="number" id="stok" name="stok" className="form-control" value={form.stok} onChange={handleChange} placeholder="Masukkan jumlah stok" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Foto Produk</label>
              <input type="file" name="photo" accept="image/*" onChange={handleChange} className="form-control" />
            </div>

            <button type="submit" className="btn btn-dark w-100 fw-bold">
              Simpan Produk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
