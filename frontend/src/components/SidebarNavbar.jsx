import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SidebarNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Panggil API logout ke backend
      await axios.delete('http://localhost:5000/admin/logout', {}, { withCredentials: true });

      // Hapus semua data di localStorage
      localStorage.removeItem('admin'); // kalau kamu menyimpan data use
      localStorage.clear(); // hapus semua data localStorage (opsional)

      // Notifikasi logout
      alert('Logout berhasil');

      // Redirect ke halaman login
      navigate('/LoginAdmin');
    } catch (error) {
      console.error('Gagal logout:', error);
      alert('Terjadi kesalahan saat logout, coba lagi.');
    }
  };
  return (
    <>
      {/* CSS langsung di file ini */}
      <style>{`
        .custom-link, .active-link {
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          margin-bottom: 8px;
          transition: all 0.3s ease;
        }

        .custom-link:hover {
          background-color: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          border-radius: 4px;
        }

        .active-link {
          background-color: rgba(255, 255, 255, 0.2);
          color: #ffffff !important;
          border-radius: 4px;
        }
      `}</style>

      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-white"
        style={{
          width: '240px',
          height: '100vh',
          background: 'linear-gradient(to bottom, #000000, #333333)',
        }}
      >
        <span className="fs-4 fw-bold mb-3">Natural Nusantara</span>
        <hr />

        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item mb-2">
            <NavLink to="/DataProduk" className={({ isActive }) => `nav-link text-white py-2 ${isActive ? 'active-link' : 'custom-link'}`}>
              Produk
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/DataPembeli" className={({ isActive }) => `nav-link text-white py-2 ${isActive ? 'active-link' : 'custom-link'}`}>
              Daftar Pembeli
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/DataPesanan" className={({ isActive }) => `nav-link text-white py-2 ${isActive ? 'active-link' : 'custom-link'}`}>
              Pesanan Masuk
            </NavLink>
          </li>
          <li className="nav-item mb-2">
            <NavLink to="/MenuLainnya" className={({ isActive }) => `nav-link text-white py-2 ${isActive ? 'active-link' : 'custom-link'}`}>
              Lainnya
            </NavLink>
          </li>
        </ul>

        <hr />
        <button className="btn btn-outline-light w-100" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
}
