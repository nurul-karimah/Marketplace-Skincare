import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateOrder() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [couriers, setCouriers] = useState([]);
  const [shippings, setShippings] = useState([]);
  const [form, setForm] = useState({
    shippingId: '',
    courierId: '',
    quantity: 1,
    paymentMethod: 'COD',
  });

  const [user] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (!user) {
      navigate('/register');
      return;
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
  }, [productId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      // Pastikan quantity tidak lebih dari stok
      const newQuantity = Math.min(Number(value), product.stok || 1);
      setForm({ ...form, [name]: newQuantity });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validasi stok sebelum kirim ke backend
    if (product.stok <= 0) {
      alert('Stok produk habis, tidak bisa dipesan!');
      return;
    }

    if (form.quantity > product.stok) {
      alert(`Stok tidak mencukupi! Maksimum yang bisa dipesan adalah ${product.stok}.`);
      return;
    }

    try {
      const payload = {
        userId: user.id,
        productId,
        shippingId: form.shippingId,
        courierId: form.courierId,
        quantity: form.quantity,
        paymentMethod: form.paymentMethod,
      };

      await axios.post('http://localhost:5000/createOrder', payload);
      alert('Pesanan berhasil dibuat!');
      navigate('/PesananUser');
    } catch (error) {
      console.error(error);
      alert('Gagal membuat pesanan!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Buat Pesanan</h2>
      <div className="card p-3 mt-3">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <h5>Harga: Rp.{product.price}</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Jumlah:</label>
            <input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="form-control" />
          </div>

          <div className="mb-3">
            <label>Metode Pembayaran:</label>
            <select className="form-control" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
              <option value="COD">COD</option>
              <option value="TRANSFER">TRANSFER</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Wilayah (Ongkir):</label>
            <select className="form-control" value={form.shippingId} onChange={(e) => setForm({ ...form, shippingId: e.target.value })}>
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
            <select className="form-control" value={form.courierId} onChange={(e) => setForm({ ...form, courierId: e.target.value })}>
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
    </div>
  );
}
