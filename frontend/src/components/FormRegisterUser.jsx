import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import heroBg from '../assets/images/hero-bg.jpg'; // Pastikan path gambar benar

export default function UserRegister() {
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    kota: '',
    kecamatan: '',
    kelurahan: '',
    rt_rw: '',
    alamatLengkap: '',
    password: '',
    nohandphone: '',
  });
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      data.append('foto', foto);

      // Register user
      await axios.post('http://localhost:5000/user', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Auto login setelah berhasil register
      const loginRes = await axios.post('http://localhost:5000/LoginUser', {
        username: formData.username,
        password: formData.password,
      });

      if (loginRes.status === 200) {
        alert('Login berhasil!');
        navigate('/LoginUser');
      }
    } catch (error) {
      alert(error.response?.data?.msg || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex flex-column flex-md-row min-vh-100"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Bagian kiri */}
      <div
        className="d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
        style={{
          background: 'linear-gradient(to bottom right, #000000, #333333)',
          width: '50%',
        }}
      >
        <h1 className="display-5 fw-bold text-center">Natural Nusantara</h1>
        <p className="mt-3 text-light text-center px-3">Beauty from nature, for everyone.</p>
      </div>

      {/* Bagian kanan (Form) */}
      <div
        className="d-flex justify-content-center align-items-center flex-grow-1 p-3"
        style={{
          backgroundColor: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div
          className="card shadow-lg w-100"
          style={{
            maxWidth: '420px',
            borderRadius: '15px',
            backgroundColor: 'rgba(255, 240, 246, 0.92)',
            overflowY: 'auto', // scroll internal
            maxHeight: '90vh', // biar gak keluar layar
          }}
        >
          <div className="card-body p-4">
            <h3 className="text-center text-dark mb-4">Register User</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nama Lengkap</label>
                <input type="text" name="nama" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" name="username" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Kota</label>
                <input type="text" name="kota" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Kecamatan</label>
                <input type="text" name="kecamatan" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Kelurahan</label>
                <input type="text" name="kelurahan" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">RT/RW</label>
                <input type="text" name="rt_rw" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Alamat Lengkap</label>
                <textarea name="alamatLengkap" className="form-control" onChange={handleChange} required rows="2"></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">nohandphone/no whatsup</label>
                <input type="number" name="nohandphone" className="form-control" onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Foto</label>
                <input type="file" className="form-control" onChange={handleFileChange} accept=".jpg,.jpeg,.png" required />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Processing...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
