// src/pages/TambahShipping.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TambahShipping() {
  const [region, setRegion] = useState('');
  const [cost, setCost] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/shipping', { region, cost });
      alert('✅ Shipping berhasil ditambahkan!');
      navigate('/DataShipping');
    } catch (error) {
      console.error(error);
      alert('❌ Gagal menambahkan shipping');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Tambah Shipping</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Region</label>
          <input type="text" className="form-control" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Masukkan nama wilayah" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Cost</label>
          <input type="number" className="form-control" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="Masukkan biaya" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
      </form>
    </div>
  );
}
