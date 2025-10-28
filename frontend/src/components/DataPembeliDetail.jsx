import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DataPembeliDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null); // untuk isi modal

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

  // === 🔹 Fungsi buka modal bukti ===
  const handleShowBukti = () => {
    if (order.paymentMethod === 'COD') {
      if (order.status === 'SELESAI') {
        // tampilkan bukti COD
        setModalContent({
          type: 'COD',
          image: order.buktiPembayaran,
        });
        setShowModal(true);
      } else {
        alert('Pesanan belum selesai, belum ada bukti pesanan sampai.');
      }
    } else {
      // tampilkan bukti transfer
      setModalContent({
        type: 'TRANSFER',
        image: order.buktiPembayaran,
        namaBank: order.namaBank,
        noRekening: order.noRekening,
      });
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: 'linear-gradient(to bottom right, #fff0f6, #ffffff)',
        minHeight: '100vh',
      }}
    >
      <div className="p-3" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <button className="btn btn-outline-dark mb-3" onClick={() => navigate(-1)}>
          ← Kembali
        </button>

        <div className="card shadow-sm p-3 p-md-4">
          <h3 className="fw-bold text-center mb-4">Detail Pembelian</h3>
          <hr />

          {/* === Data Pembeli === */}
          <div className="row align-items-center mb-4">
            <div className="col-12 col-md-3 text-center mb-3 mb-md-0">
              <img src={`http://localhost:5000/users/${order.User?.foto || 'default.jpg'}`} alt="Foto Pembeli" className="rounded-circle shadow-sm" width="140" height="140" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col-12 col-md-9 text-center text-md-start">
              <h5 className="fw-bold mb-1">{order.User?.nama || '-'}</h5>
              <p className="mb-0">
                <strong>Alamat:</strong> {order.address || '-'}
              </p>
            </div>
          </div>

          <hr />

          {/* === Data Produk === */}
          <div className="row align-items-center mb-4">
            <div className="col-12 col-md-3 text-center mb-3 mb-md-0">
              <img src={`http://localhost:5000/Products/${order.Product?.photo || 'no-image.jpg'}`} alt="Foto Produk" className="rounded shadow-sm img-fluid" style={{ maxWidth: '180px', height: 'auto', objectFit: 'cover' }} />
            </div>
            <div className="col-12 col-md-9 text-center text-md-start">
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

          {/* === Rincian Pembelian === */}
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Ongkir:</strong> Rp {order.Shipping?.cost?.toLocaleString() || '0'}
                </li>
                <li className="list-group-item">
                  <strong>Kurir:</strong> {order.Courier?.name || '-'}
                </li>
                <li className="list-group-item">
                  <strong>Metode Pembayaran:</strong> {order.paymentMethod || '-'}
                  <br />
                  <button className="btn btn-sm btn-primary mt-2" onClick={handleShowBukti}>
                    Lihat Bukti Pembayaran
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-12 col-md-6">
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

      {/* === Modal Bukti Pembayaran / COD === */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalContent?.type === 'COD' ? 'Bukti Pesanan COD' : 'Bukti Pembayaran Transfer'}</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body text-center">
                {modalContent?.image ? (
                  <>
                    <img src={`http://localhost:5000/pembayaran/${modalContent.image}`} alt="Bukti" className="img-fluid rounded shadow-sm mb-3" style={{ maxHeight: '300px' }} />
                    {modalContent.type === 'TRANSFER' && (
                      <>
                        <p>
                          <strong>Nama Bank:</strong> {modalContent.namaBank || '-'}
                        </p>
                        <p>
                          <strong>No. Rekening:</strong> {modalContent.noRekening || '-'}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <p>Tidak ada bukti yang diunggah.</p>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
