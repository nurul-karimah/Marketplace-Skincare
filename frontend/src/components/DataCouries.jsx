import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DataCourier() {
  const navigate = useNavigate();
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCouriers();
  }, []);

  const fetchCouriers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Courier');
      setCouriers(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Gagal mengambil data courier:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-success">📦 Data Courier</h3>
        <button className="btn btn-success" onClick={() => navigate('/AddCourier')}>
          ➕ Tambah Courier
        </button>
      </div>

      {loading ? (
        <p className="text-center text-muted">Memuat data...</p>
      ) : couriers.length === 0 ? (
        <p className="text-center text-muted">Belum ada data courier.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle shadow-sm">
            <thead className="table-success text-center">
              <tr>
                <th style={{ width: '10%' }}>No</th>
                <th>Nama Courier</th>
                <th>Tanggal Dibuat</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {couriers.map((courier, index) => (
                <tr key={courier.id}>
                  <td>{index + 1}</td>
                  <td className="fw-semibold">{courier.name}</td>
                  <td>{new Date(courier.createdAt).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-4">
        <Link to="/MenuLainnya" className="btn btn-secondary">
          ⬅️ Kembali ke Menu Lainnya
        </Link>
      </div>
    </div>
  );
}
