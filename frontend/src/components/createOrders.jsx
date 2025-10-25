import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateOrder() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [couriers, setCouriers] = useState([]);
  const [shippings, setShippings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [buktiPembayaran, setBuktiPembayaran] = useState(null);

  const [form, setForm] = useState({
    shippingId: '',
    courierId: '',
    quantity: 1,
    paymentMethod: 'COD',
    namaBank: '',
    noRekening: '',
  });

  const [user] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (!user) {
      navigate('/register');
      return;
    }

    // isi otomatis untuk bank dan rekening jika transfer
    if (form.paymentMethod === 'TRANSFER') {
      setForm((prev) => ({
        ...prev,
        namaBank: 'BRI',
        noRekening: '403401014941530',
      }));
    }

    const fetchData = async () => {
      try {
        const productRes = await axios.get(`http://localhost:5000/products/${productId}`);
        setProduct(productRes.data);

        const courierRes = await axios.get('http://localhost:5000/courier');
        setCouriers(courierRes.data);

        const shippingRes = await axios.get('http://localhost:5000/shipping');
        setShippings(shippingRes.data);
      } catch (err) {
        console.error('Gagal memuat data:', err);
      }
    };

    fetchData();
  }, [productId, navigate, form.paymentMethod]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      const newQuantity = Math.min(Number(value), product.stok || 1);
      setForm({ ...form, [name]: newQuantity });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.stok <= 0) {
      alert('Stok produk habis!');
      return;
    }

    if (form.quantity > product.stok) {
      alert(`Stok tidak mencukupi! Maksimum ${product.stok}`);
      return;
    }

    // Jika metode pembayaran adalah transfer, tampilkan modal dulu
    if (form.paymentMethod === 'TRANSFER') {
      setShowModal(true);
      return;
    }

    await kirimPesanan();
  };

  const kirimPesanan = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', user.id);
      formData.append('productId', productId);
      formData.append('shippingId', form.shippingId);
      formData.append('courierId', form.courierId);
      formData.append('quantity', form.quantity);
      formData.append('paymentMethod', form.paymentMethod);
      formData.append('namaBank', form.namaBank);
      formData.append('noRekening', form.noRekening);
      if (buktiPembayaran) formData.append('buktiPembayaran', buktiPembayaran);

      await axios.post('http://localhost:5000/createOrder', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Pesanan berhasil dibuat!');
      navigate('/PesananUser');
    } catch (error) {
      console.error(error);
      alert('Gagal membuat pesanan!');
    }
  };

  const handleUploadChange = (e) => {
    setBuktiPembayaran(e.target.files[0]);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    kirimPesanan();
  };

  return (
    <div className="container mt-4">
      <h2>Buat Pesanan</h2>
      <div className="card p-3 mt-3">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <p>Stok : {product.stok}</p>
        <h5>Harga: Rp.{product.price}</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Jumlah:</label>
            <input type="number" min="1" value={form.quantity} onChange={handleChange} name="quantity" className="form-control" />
          </div>

          <div className="mb-3">
            <label>Metode Pembayaran:</label>
            <select className="form-control" value={form.paymentMethod} onChange={handleChange} name="paymentMethod">
              <option value="COD">COD</option>
              <option value="TRANSFER">TRANSFER</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Wilayah (Ongkir):</label>
            <select className="form-control" value={form.shippingId} onChange={handleChange} name="shippingId">
              <option value="">Pilih Wilayah</option>
              {shippings.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.region} — Rp.{s.cost}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Kurir:</label>
            <select className="form-control" value={form.courierId} onChange={handleChange} name="courierId">
              <option value="">Pilih Kurir</option>
              {couriers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Alamat Pengiriman:</label>
            <textarea readOnly className="form-control" value={user ? `${user.alamatLengkap}, RT/RW ${user.rt_rw}, Kel. ${user.kelurahan}, Kec. ${user.kecamatan}, ${user.kota}` : ''}></textarea>
          </div>

          <button type="submit" className="btn btn-success">
            Konfirmasi Pesanan
          </button>
        </form>
      </div>

      {/* Modal Transfer */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pembayaran Transfer</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Silakan transfer ke rekening berikut:</p>
                <ul>
                  <li>
                    <b>No. Rekening:</b> 403401014941530
                  </li>
                  <li>
                    <b>Bank:</b> BRI
                  </li>
                  <li>
                    <b>Atas Nama:</b> Nurul Karimah
                  </li>
                </ul>

                <form onSubmit={handleTransferSubmit} className="p-4 shadow-lg rounded-4 bg-white border-0" style={{ maxWidth: '500px', margin: 'auto' }}>
                  <h4 className="text-center mb-4 fw-bold text-primary">Konfirmasi Pembayaran 💳</h4>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Upload Bukti Pembayaran</label>
                    <div className="input-group">
                      <span className="input-group-text bg-primary text-white">
                        <i className="bi bi-upload"></i>
                      </span>
                      <input type="file" accept="image/*" className="form-control" onChange={handleUploadChange} required />
                    </div>
                    <small className="text-muted">Hanya file gambar (JPG, PNG, JPEG) maksimal 5MB.</small>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Nama Bank</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-bank"></i>
                      </span>
                      <input type="text" name="namaBank" className="form-control" value={form.namaBank} readOnly />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">No. Rekening</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <i className="bi bi-credit-card-2-front"></i>
                      </span>
                      <input type="text" name="noRekening" className="form-control" value={form.noRekening} readOnly />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-semibold py-2 rounded-3 shadow-sm">
                    <i className="bi bi-send"></i> Kirim Bukti Pembayaran
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
