import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DataPenjualan() {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ totalProdukTerjual: 0, totalPendapatan: 0 });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getOrder');
      setOrders(res.data.orders);
      setSummary(res.data.summary);
    } catch (error) {
      console.error('Gagal memuat data penjualan:', error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/UpdateStatusOrder/${id}`, { status: newStatus });
      alert('Status pesanan berhasil diperbarui!');
      fetchOrders(); // refresh data
    } catch (error) {
      console.error('Gagal update status:', error);
      alert('Gagal update status pesanan');
    }
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 className="text-center fw-bold mb-4">📊 Data Penjualan</h2>

      {/* === Ringkasan Penjualan === */}
      <div className="row g-4 mb-4 justify-content-center">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow-sm border-0 p-4 text-center h-100">
            <h6 className="fw-bold text-secondary">Jumlah Produk Terjual</h6>
            <h3 className="fw-bold text-dark">{summary.totalProdukTerjual}</h3>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow-sm border-0 p-4 text-center h-100">
            <h6 className="fw-bold text-secondary">GMV Penjualan</h6>
            <h3 className="fw-bold text-success">Rp {Number(summary.totalPendapatan || 0).toLocaleString('id-ID')}</h3>
          </div>
        </div>
      </div>

      {/* === Tabel Pesanan === */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="fw-bold mb-3 text-center text-md-start">Daftar Pesanan</h5>

          {/* Gunakan table-responsive agar bisa di-scroll di layar kecil */}
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th>#</th>
                  <th>Nama Pembeli</th>
                  <th>Produk</th>
                  <th>Jumlah</th>
                  <th>Total Harga</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{index + 1}</td>
                    <td>{order.User?.nama || '-'}</td>
                    <td>{order.Product?.name || '-'}</td>
                    <td>{order.quantity}</td>
                    <td>Rp {order.totalPrice.toLocaleString('id-ID')}</td>
                    <td>
                      <select
                        className={`form-select form-select-sm text-center ${
                          order.status === 'MENUNGGU' ? 'bg-warning text-dark' : order.status === 'SELESAI' ? 'bg-success text-white' : order.status === 'DIKIRIM' ? 'bg-info text-white' : 'bg-secondary text-white'
                        }`}
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        style={{ fontWeight: 'bold' }}
                      >
                        <option value="MENUNGGU">MENUNGGU</option>
                        <option value="DIKIRIM">DIKIRIM</option>
                        <option value="SELESAI">SELESAI</option>
                        <option value="DIBATALKAN">DIBATALKAN</option>
                      </select>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Jika tidak ada data */}
          {orders.length === 0 && <p className="text-center text-muted mt-3">Belum ada data pesanan.</p>}
        </div>
      </div>
    </div>
  );
}
