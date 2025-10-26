// src/pages/DataShipping.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DataShipping() {
  const [shippings, setShippings] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getShippings();
  }, []);

  const getShippings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/shipping');
      setShippings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah kamu yakin ingin menghapus shipping ini?')) {
      try {
        await axios.delete(`http://localhost:5000/deleteShipping/${id}`);
        setMessage('Shipping berhasil dihapus ✅');

        // ✅ Hapus data dari state tanpa reload
        setShippings(shippings.filter((item) => item.id !== id));

        // Hapus pesan notifikasi setelah 3 detik
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error(error);
        alert('Gagal menghapus shipping ❌');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Data Shipping</h3>
        <Link to="/AddShipping" className="btn btn-success">
          + Tambah Data Shipping
        </Link>
      </div>

      {message && (
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      )}

      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>No</th>
            <th>Region</th>
            <th>Cost</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {shippings.length > 0 ? (
            shippings.map((ship, index) => (
              <tr key={ship.id}>
                <td>{index + 1}</td>
                <td>{ship.region}</td>
                <td>Rp {parseInt(ship.cost).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDelete(ship.id)} className="btn btn-danger btn-sm">
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                Belum ada data shipping
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
