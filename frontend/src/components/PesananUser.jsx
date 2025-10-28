import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PesananUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  const handleLogout = async () => {
    try {
      await axios.delete('http://localhost:5000/Userlogout');
      localStorage.removeItem('user'); // 🧹 hapus data login
      alert('Logout berhasil!');
      navigate('/'); // kembali ke halaman login
    } catch (error) {
      console.error('Logout gagal:', error);
      alert('Terjadi kesalahan saat logout.');
    }
  };

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/getOrderUser/${userId}`);
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Gagal mengambil pesanan:', error);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      {/* ========== SIDEBAR ========== */}
      <div
        className={`bg-dark text-white d-flex flex-column p-3 ${sidebarOpen ? 'active' : ''}`}
        style={{
          width: '250px',
          position: 'fixed',
          height: '100%',
          top: 0,
          left: sidebarOpen ? '0' : '-250px',
          transition: 'all 0.3s ease',
          zIndex: 1000,
        }}
      >
        {/* Header Sidebar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0">Natura</h4>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout} title="Logout">
            <i className="bi bi-box-arrow-right"></i>
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

        {/* Footer Sidebar */}
        <div className="mt-auto text-center">
          <hr className="border-secondary" />
          <a
            href="/"
            className="btn w-100 fw-bold mb-3"
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

      {/* ========== KONTEN ========== */}
      <div
        className="container-fluid"
        style={{
          marginLeft: window.innerWidth > 992 ? '270px' : '0',
          padding: '20px',
          transition: 'margin 0.3s ease',
        }}
      >
        {/* Tombol toggle sidebar di layar kecil */}
        <button className="btn btn-outline-dark d-lg-none mb-3" onClick={toggleSidebar}>
          <i className="bi bi-list"></i> Menu
        </button>

        <h3 className="mb-4 text-center">📦 Pesanan Anda</h3>

        {loading ? (
          <div className="text-center mt-5">Memuat data pesanan...</div>
        ) : orders.length === 0 ? (
          <div className="alert alert-warning text-center">Belum ada pesanan yang dibuat.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle shadow-sm">
              <thead className="table-dark text-center">
                <tr>
                  <th>No</th>
                  <th>Produk</th>
                  <th>Kurir</th>
                  <th>Ongkir</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                  <th>Alamat</th>
                  <th>No HP</th>
                  <th>Status</th>
                  <th>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={order.id}>
                    <td className="text-center">{i + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={`http://localhost:5000/Products/${order.Product.photo}`}
                          alt={order.Product.name}
                          style={{
                            width: '60px',
                            borderRadius: '8px',
                            marginRight: '10px',
                          }}
                        />
                        <div>
                          <strong>{order.Product.name}</strong>
                          <br />
                          <small>Rp {parseInt(order.Product.price).toLocaleString()}</small>
                        </div>
                      </div>
                    </td>
                    <td>{order.Courier.name}</td>
                    <td>Rp {parseInt(order.Shipping.cost).toLocaleString()}</td>
                    <td>{order.quantity}</td>
                    <td>
                      <strong>Rp {parseInt(order.totalPrice).toLocaleString()}</strong>
                    </td>
                    <td>
                      <small>{order.address}</small>
                    </td>
                    <td>
                      <small>{order.nohandphone}</small>
                    </td>
                    <td className="text-center">
                      <span className={`badge ${order.status === 'MENUNGGU' ? 'bg-warning text-dark' : order.status === 'DIKIRIM' ? 'bg-primary' : order.status === 'SELESAI' ? 'bg-success' : 'bg-danger'}`}>{order.status}</span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* BACKDROP untuk layar kecil */}
      {sidebarOpen && <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none" style={{ zIndex: 999 }} onClick={toggleSidebar}></div>}
    </div>
  );
}
