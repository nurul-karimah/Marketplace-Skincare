import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RiwayatPembelian() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  // 🔹 Logout handler
  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/Userlogout');
      localStorage.removeItem('user');
      alert('Logout berhasil!');
      navigate('/');
    } catch (error) {
      console.error('Logout gagal:', error);
      alert('Terjadi kesalahan saat logout.');
    }
  };

  // 🔹 Ambil riwayat pesanan user
  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/HistoriOrder/${userId}`);
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Gagal mengambil riwayat:', error);
      setLoading(false);
    }
  };

  // 🔹 Hapus riwayat
  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus riwayat ini?')) return;

    try {
      const res = await axios.delete(`http://localhost:5000/deleteHistori/${id}`, {
        data: { userId: user.id },
      });
      alert(res.data.msg);
      fetchOrders();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // tampilkan pesan dari backend
      } else {
        alert('Terjadi kesalahan saat menghapus riwayat.');
      }
      console.error('Gagal menghapus riwayat:', error);
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* 🔹 Sidebar */}
      <div className="bg-dark text-white d-flex flex-column p-3" style={{ width: '250px', position: 'fixed', height: '100%' }}>
        {/* Tombol Logout di atas */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0">Natura</h4>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout} title="Logout">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>

        {/* Menu Navigasi */}
        <ul className="nav flex-column mt-3">
          <li className="nav-item mb-2">
            <a href="/User" className="nav-link text-white">
              🏠 Dashboard
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/PesananUser" className="nav-link text-white">
              📦 Pesanan Anda
            </a>
          </li>
          <li className="nav-item mb-2">
            <a href="/RiwayatUser" className="nav-link text-white">
              📊 Riwayat Pesanan
            </a>
          </li>
        </ul>

        {/* Bagian bawah sidebar */}
        <div className="mt-auto text-center">
          <hr className="border-secondary" />

          {/* 🔹 Tombol Kembali ke Halaman Pembelian */}
          <a
            href="/"
            className="btn btn-light w-100 fw-bold mb-3"
            style={{
              backgroundColor: '#f78da7',
              border: 'none',
              color: 'white',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#ec4899')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#f78da7')}
          >
            🛒 Kembali ke Pembelian
          </a>

          <small>© {new Date().getFullYear()} Natural Nusantara</small>
        </div>
      </div>

      {/* 🔹 Konten utama */}
      <div className="container py-4" style={{ marginLeft: '260px', flex: 1 }}>
        <h3 className="mb-4 fw-bold text-center text-dark">🧾 Riwayat Pembelian</h3>

        {loading ? (
          <p className="text-center">Memuat data...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-muted">Belum ada riwayat pembelian.</p>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div key={order.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm border-0 rounded-4 h-100">
                  <img
                    src={`http://localhost:5000/products/${order.Product.photo}`}
                    className="card-img-top rounded-top-4"
                    alt={order.Product.name}
                    style={{
                      height: '200px',
                      objectFit: 'cover',
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{order.Product.name}</h5>
                    <p className="card-text mb-1">
                      <strong>Harga:</strong> Rp {parseFloat(order.Product.price).toLocaleString('id-ID')}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Jumlah:</strong> {order.quantity}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Total:</strong> Rp {parseFloat(order.totalPrice).toLocaleString('id-ID')}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Kurir:</strong> {order.Courier.name}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Ongkir:</strong> Rp {parseFloat(order.Shipping.cost).toLocaleString('id-ID')}
                    </p>
                    <p className="card-text mb-1">
                      <strong>Status:</strong> <span className={`badge ${order.status === 'MENUNGGU' ? 'bg-warning text-dark' : order.status === 'DIKIRIM' ? 'bg-info text-dark' : 'bg-success'}`}>{order.status}</span>
                    </p>
                    <p className="card-text small text-muted">
                      <strong>Tanggal:</strong> {new Date(order.createdAt).toLocaleString('id-ID')}
                    </p>

                    <button className="btn btn-danger w-100 mt-2" onClick={() => handleDelete(order.id)}>
                      🗑️ Batalkan Pesanan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
