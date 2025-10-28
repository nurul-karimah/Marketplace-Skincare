import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DashboardUser() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    menunggu: 0,
    dikirim: 0,
    selesai: 0,
  });

  const user = JSON.parse(localStorage.getItem('user')); // ambil user dari localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/getOrderUser/${user.id}`);
        setOrders(res.data);

        // Hitung statistik
        const total = res.data.length;
        const menunggu = res.data.filter((o) => o.status === 'MENUNGGU').length;
        const dikirim = res.data.filter((o) => o.status === 'DIKIRIM').length;
        const selesai = res.data.filter((o) => o.status === 'SELESAI').length;

        setStats({ total, menunggu, dikirim, selesai });
      } catch (err) {
        console.error('Gagal mengambil pesanan:', err);
      }
    };

    fetchOrders();
  }, [user.id]);

  // Fungsi logout
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

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white d-flex flex-column p-3 position-fixed h-100`}
        style={{
          width: '250px',
          top: 0,
          left: sidebarOpen ? '0' : '-250px',
          transition: 'left 0.3s ease',
          zIndex: 1050,
        }}
      >
        {/* Header Sidebar */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0">Natura</h4>

          {/* Tombol Close hanya muncul di mobile */}
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-light btn-sm me-2 d-md-none" onClick={() => setSidebarOpen(false)}>
              ✖
            </button>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout} title="Logout">
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
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

      {/* Tombol toggle sidebar di mobile */}
      <button
        className="btn btn-dark d-md-none position-fixed"
        style={{
          top: '15px',
          left: '15px',
          zIndex: 1100,
          borderRadius: '50%',
          width: '45px',
          height: '45px',
        }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Overlay (muncul di mobile saat sidebar terbuka) */}
      {sidebarOpen && (
        <div
          className="overlay d-md-none"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1040,
          }}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Konten utama */}
      <div className="main-content flex-grow-1" style={{ marginLeft: '250px' }}>
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-5">User Dashboard</h2>

          <div className="row g-4">
            {/* Total Orders */}
            <div className="col-6 col-md-3">
              <div className="card shadow-sm border-0 text-center p-4" style={{ borderRadius: '15px' }}>
                <h5 className="fw-semibold text-secondary">Total Orders</h5>
                <h2 className="fw-bold text-primary">{stats.total}</h2>
              </div>
            </div>

            {/* Menunggu */}
            <div className="col-6 col-md-3">
              <div className="card shadow-sm border-0 text-center p-4" style={{ borderRadius: '15px' }}>
                <h5 className="fw-semibold text-secondary">Menunggu</h5>
                <h2 className="fw-bold text-warning">{stats.menunggu}</h2>
              </div>
            </div>

            {/* Dikirim */}
            <div className="col-6 col-md-3">
              <div className="card shadow-sm border-0 text-center p-4" style={{ borderRadius: '15px' }}>
                <h5 className="fw-semibold text-secondary">Dikirim</h5>
                <h2 className="fw-bold text-info">{stats.dikirim}</h2>
              </div>
            </div>

            {/* Selesai */}
            <div className="col-6 col-md-3">
              <div className="card shadow-sm border-0 text-center p-4" style={{ borderRadius: '15px' }}>
                <h5 className="fw-semibold text-secondary">Selesai</h5>
                <h2 className="fw-bold text-success">{stats.selesai}</h2>
              </div>
            </div>
          </div>

          <div className="mt-5 text-center">
            <small className="text-muted">© {new Date().getFullYear()} Natural Nusantara — User Dashboard</small>
          </div>
        </div>
      </div>

      {/* CSS Responsif */}
      <style>
        {`
          @media (max-width: 768px) {
            .main-content {
              margin-left: 0 !important;
            }
            .sidebar {
              left: -250px;
            }
            .sidebar.show {
              left: 0;
            }
          }

          @media (min-width: 769px) {
            .sidebar {
              left: 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
}
