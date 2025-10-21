import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function DataPembeliDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchBuyerDetail();
  }, []);

  const fetchBuyerDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/getPembeli/${id}`);
      setOrder(res.data);
    } catch (error) {
      console.error('Gagal memuat detail pembeli:', error);
    }
  };

  if (!order) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Memuat detail pembelian...</p>
      </div>
    );
  }

  return (
    <div
      className="p-4 w-100"
      style={{
        background: 'linear-gradient(to bottom right, #fff0f6, #ffffff)',
        minHeight: '100vh',
      }}
    >
      <div className="flex-grow-1 p-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
          ← Kembali
        </button>

        <div className="card shadow-sm p-4">
          <h3 className="fw-bold text-center mb-4">Detail Pembelian</h3>
          <hr />

          {/* === Baris 1: Data Pembeli === */}
          <div className="row mb-4">
            <div className="col-md-3 text-center">
              <img src={`http://localhost:5000/users/${order.User?.foto || 'default.jpg'}`} alt="Foto Pembeli" className="rounded-circle mb-3 shadow-sm" width="140" height="140" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col-md-9">
              <h5 className="fw-bold mb-1">{order.User?.nama || '-'}</h5>

              <p className="mb-0">
                <strong>Alamat:</strong> {order.address || '-'}
              </p>
            </div>
          </div>

          <hr />

          {/* === Baris 2: Data Produk === */}
          <div className="row align-items-center mb-4">
            <div className="col-md-3 text-center">
              <img src={`http://localhost:5000/Products/${order.Product?.photo || 'no-image.jpg'}`} alt="Foto Produk" className="rounded shadow-sm" width="150" height="150" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col-md-9">
              <h5 className="fw-bold">{order.Product?.name || '-'}</h5>
              <p className="mb-1">
                <strong>Jumlah:</strong> {order.quantity}
              </p>
              <p className="mb-1">
                <strong>Harga Produk:</strong> Rp {order.Product?.price?.toLocaleString() || '0'}
              </p>
            </div>
          </div>

          <hr />

          {/* === Baris 3: Rincian Pembelian === */}
          <div className="row">
            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Ongkir:</strong> Rp {order.Shipping?.cost?.toLocaleString() || '0'}
                </li>
                <li className="list-group-item">
                  <strong>Kurir:</strong> {order.Courier?.name || '-'}
                </li>
              </ul>
            </div>

            <div className="col-md-6">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Total Harga:</strong> Rp {order.totalPrice?.toLocaleString() || '0'}
                </li>
                <li className="list-group-item">
                  <strong>Status:</strong> <span className={`badge ${order.status === 'MENUNGGU' ? 'bg-warning text-dark' : order.status === 'SELESAI' ? 'bg-success' : 'bg-secondary'}`}>{order.status}</span>
                </li>
                <li className="list-group-item">
                  <strong>Waktu Pemesanan:</strong> {new Date(order.createdAt).toLocaleString('id-ID')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
