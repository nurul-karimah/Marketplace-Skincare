import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // ⬅️ tambahkan useLocation
import 'bootstrap/dist/css/bootstrap.min.css';
import heroBg from '../assets/images/hero-bg.jpg';

export default function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const navigate = useNavigate();
  const location = useLocation(); // ⬅️ untuk tahu dari mana user datang

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/LoginUser', { username, password }, { withCredentials: true });

      // Simpan user ke localStorage agar bisa dipakai di order
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setAlert({ show: true, type: 'success', message: 'Login berhasil!' });

      setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });

        // ⬇️ Jika login karena mau buat pesanan, arahkan ke CreateOrder
        if (location.state?.productId) {
          navigate('/CreateOrder', { state: { productId: location.state.productId } });
        } else {
          navigate('/User');
        }
      }, 2000);
    } catch (error) {
      setAlert({
        show: true,
        type: 'danger',
        message: error.response?.data?.msg || 'Login gagal',
      });

      setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Bagian kiri */}
      <div
        className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
        style={{
          background: 'linear-gradient(to bottom right, #000000, #333333)',
          width: '50%',
        }}
      >
        <h1 className="display-4 fw-bold">Natural Nusantara</h1>
        <p className="mt-3 text-light">Beauty from nature, for everyone.</p>
      </div>

      {/* Bagian kanan - background gambar */}
      <div
        className="d-flex flex-column justify-content-center align-items-center w-100 w-md-50 p-4"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="card shadow-lg"
          style={{
            minWidth: '350px',
            maxWidth: '400px',
            borderRadius: '15px',
            backgroundColor: 'rgba(255, 240, 246, 0.85)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div className="card-body p-4">
            <h3 className="text-center text-dark mb-4">Login User</h3>
            {alert.show && (
              <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukan Username" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" required />
              </div>

              <button
                type="submit"
                className="btn w-100 text-white"
                style={{
                  background: 'linear-gradient(to right, #f78da7, #ec4899)',
                  borderRadius: '8px',
                }}
              >
                Masuk
              </button>

              <div className="text-center mt-3">
                <p className="mb-0 text-muted">
                  Belum punya akun?{' '}
                  <a href="/RegisterUser" className="text-decoration-none fw-bold" style={{ color: '#ec4899' }}>
                    Daftar Sekarang
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
        <small className="text-white mt-3">© {new Date().getFullYear()} Natural Nusantara</small>
      </div>
    </div>
  );
}
