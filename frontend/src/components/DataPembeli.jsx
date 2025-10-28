import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function DataPembeli() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getPembeli');
      setBuyers(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Gagal memuat data pembeli:', error);
      setLoading(false);
    }
  };

  return (
    <div
      className="p-4 w-100"
      style={{
        background: 'linear-gradient(to bottom right, #fff0f6, #ffffff)',
        minHeight: '100vh',
      }}
    >
      {/* Konten utama */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <h2 className="fw-bold text-center mb-4">Daftar Pembeli</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : buyers.length === 0 ? (
          <p className="text-center text-muted">Belum ada data pembeli.</p>
        ) : (
          <div
            className="table-responsive shadow-sm rounded bg-white p-3"
            style={{
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch', // biar smooth di mobile
            }}
          >
            <table className="table table-hover align-middle mb-0">
              <thead className="table-dark text-center align-middle">
                <tr>
                  <th>No</th>
                  <th>Nama Pembeli</th>
                  <th>Alamat</th>
                  <th>Produk</th>
                  <th>Harga</th>
                  <th>Ongkir</th>
                  <th>Total</th>
                  <th>Kurir</th>
                  <th>Status</th>
                  <th>Lainnya</th>
                </tr>
              </thead>
              <tbody>
                {buyers.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.User?.nama || '-'}</td>
                    <td style={{ minWidth: '220px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {order.User ? `${order.User.alamatLengkap}, RT ${order.User.rt}/RW ${order.User.rw}, ${order.User.kelurahan}, ${order.User.kecamatan}, ${order.User.kotaKabupaten}` : '-'}
                    </td>
                    <td>{order.Product?.name || '-'}</td>
                    <td>Rp {order.Product?.price?.toLocaleString() || '0'}</td>
                    <td>Rp {order.Shipping?.cost?.toLocaleString() || '0'}</td>
                    <td>Rp {order.totalPrice?.toLocaleString() || '0'}</td>
                    <td>{order.Courier?.name || '-'}</td>
                    <td>
                      <span className={`badge ${order.status === 'MENUNGGU' ? 'bg-warning text-dark' : order.status === 'SELESAI' ? 'bg-success' : 'bg-secondary'}`}>{order.status}</span>
                    </td>
                    <td>
                      <NavLink to={`/DataPembeliDetail/${order.id}`} className="btn btn-sm btn-outline-primary">
                        View
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Style tambahan agar tabel tetap rapi di mobile */}
      <style>{`
    @media (max-width: 768px) {
      table {
        font-size: 0.9rem;
      }

      th, td {
        white-space: nowrap;
        text-align: center;
        vertical-align: middle;
      }

      td:nth-child(3) {
        white-space: normal;
        word-wrap: break-word;
        text-align: left;
      }

      .table-responsive {
        border: 1px solid #dee2e6;
        border-radius: 10px;
      }
    }
  `}</style>
    </div>
  );
}
