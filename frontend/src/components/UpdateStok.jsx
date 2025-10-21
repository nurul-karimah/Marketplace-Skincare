import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateStokForm() {
  const { id } = useParams(); // Ambil ID dari URL
  const navigate = useNavigate();
  const [stok, setStok] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.put(`http://localhost:5000/updateStok/${id}`, {
        stok: parseInt(stok),
      });

      // Tampilkan alert sukses
      window.alert(response.data.msg || '✅ Stok berhasil diperbarui!');

      // Redirect ke halaman DataProduk
      navigate('/DataProduk');
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Terjadi kesalahan');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(to bottom right, rgba(255,192,203,0.4), rgba(255,255,255,0.6))',
      }}
    >
      <div
        className="p-5 rounded-4 shadow"
        style={{
          width: '400px',
          backgroundColor: 'rgba(255, 192, 203, 0.3)', // pink lembut dengan opacity
          backdropFilter: 'blur(10px)',
        }}
      >
        <h3 className="text-center mb-4" style={{ color: '#d63384' }}>
          Update Stok Produk
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">ID Produk</label>
            <input type="text" className="form-control border-0 shadow-sm" value={id} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Stok Baru</label>
            <input type="number" className="form-control border-0 shadow-sm" value={stok} onChange={(e) => setStok(e.target.value)} placeholder="Masukkan jumlah stok" required />
          </div>

          <button
            type="submit"
            className="btn w-100 py-2 fw-bold"
            style={{
              backgroundColor: '#ff69b4',
              color: 'white',
              border: 'none',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#ff85c1')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#ff69b4')}
          >
            Update Stok
          </button>
        </form>

        {message && <div className="alert alert-danger mt-4 text-center fw-semibold">{message}</div>}
      </div>
    </div>
  );
}
