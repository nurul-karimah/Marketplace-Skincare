import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RiwayatPembelian() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [buktiFile, setBuktiFile] = useState(null);

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
        alert(error.response.data.msg);
      } else {
        alert('Terjadi kesalahan saat menghapus riwayat.');
      }
      console.error('Gagal menghapus riwayat:', error);
    }
  };

  // 🔹 Upload bukti COD
  const handleUploadCOD = async (e) => {
    e.preventDefault();

    if (!selectedOrder) {
      alert('Pilih pesanan terlebih dahulu.');
      return;
    }

    if (!buktiFile) {
      alert('Silakan pilih foto bukti penerimaan.');
      return;
    }

    const formData = new FormData();
    formData.append('buktiPembayaran', buktiFile);

    try {
      const res = await axios.put(`http://localhost:5000/UpdatePesananCod/${selectedOrder.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      alert(res.data.msg);
      setSelectedOrder(null);
      setBuktiFile(null);
      fetchOrders();
    } catch (error) {
      console.error('Gagal upload bukti COD:', error);
      alert(error.response?.data?.msg || 'Gagal upload bukti COD.');
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* 🔹 Sidebar */}
      <div className="bg-dark text-white d-flex flex-column p-3" style={{ width: '250px', position: 'fixed', height: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0">Natura</h4>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>

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

        <div className="mt-auto text-center">
          <hr className="border-secondary" />
          <a href="/" className="btn btn-light w-100 fw-bold mb-3" style={{ backgroundColor: '#f78da7', border: 'none', color: 'white' }}>
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
                  <img src={`http://localhost:5000/products/${order.Product.photo}`} className="card-img-top rounded-top-4" alt={order.Product.name} style={{ height: '200px', objectFit: 'cover' }} />
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
                    <p className="card-text mb-1">
                      <strong>Metode:</strong> {order.paymentMethod}
                    </p>
                    <p className="card-text small text-muted">
                      <strong>Tanggal:</strong> {new Date(order.createdAt).toLocaleString('id-ID')}
                    </p>

                    {/* 🔹 Kondisi tombol sesuai metode & status */}
                    {order.status === 'SELESAI' ? (
                      order.paymentMethod === 'COD' ? (
                        order.buktiPembayaran ? (
                          // ✅ Jika COD dan sudah upload bukti -> tampilkan tombol Hapus Riwayat
                          <button className="btn btn-danger w-100 mt-2" onClick={() => handleDelete(order.id)}>
                            🗑️ Hapus Riwayat
                          </button>
                        ) : (
                          // ✅ Jika COD dan belum upload bukti -> tampilkan tombol Upload Bukti
                          <button className="btn btn-success w-100 mt-2" onClick={() => setSelectedOrder(order)}>
                            📷 Upload Bukti Pesanan Diterima
                          </button>
                        )
                      ) : (
                        // ✅ Jika metode TRANSFER dan status SELESAI -> tampilkan tombol Hapus Riwayat
                        <button className="btn btn-danger w-100 mt-2" onClick={() => handleDelete(order.id)}>
                          🗑️ Hapus Riwayat
                        </button>
                      )
                    ) : (
                      // ✅ Jika belum selesai, tetap tombol Batalkan Pesanan
                      <button className="btn btn-danger w-100 mt-2" onClick={() => handleDelete(order.id)}>
                        🗑️ Batalkan Pesanan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔹 Modal Upload COD */}
      {selectedOrder && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Bukti Penerimaan (COD)</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedOrder(null)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUploadCOD}>
                  <div className="mb-3">
                    <label className="form-label">Foto Bukti Produk Diterima</label>
                    <input type="file" className="form-control" accept=".jpg,.jpeg,.png" onChange={(e) => setBuktiFile(e.target.files[0])} />
                  </div>
                  <button type="submit" className="btn btn-success w-100">
                    Kirim Bukti
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
