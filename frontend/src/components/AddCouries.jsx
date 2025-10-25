import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddCourier() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/Courier', { name });

      setMessage({ type: 'success', text: 'Courier berhasil dibuat!' });

      // ✅ Redirect ke MenuLainnya setelah 2 detik
      setTimeout(() => {
        navigate('/MenuLainnya');
      }, 2000);
    } catch (error) {
      console.error('Gagal membuat courier:', error);
      setMessage({ type: 'error', text: 'Gagal menambahkan courier, coba lagi.' });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow p-4 rounded-4 border-0">
        <h4 className="text-center fw-bold mb-4 text-success">Tambah Courier</h4>

        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Nama Courier</label>
            <input type="text" className="form-control" placeholder="Masukkan nama courier" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/M/MenuLainnya')}>
              Kembali
            </button>

            <button type="submit" className="btn btn-success">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
