import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DataProduk() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/productsCategori');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await axios.delete(`http://localhost:5000/products/${id}`);
        alert('Produk berhasil dihapus');
        fetchProducts(); // refresh data setelah hapus
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus produk');
      }
    }
  };

  return (
    <div
      className="p-4 w-100"
      style={{
        background: 'linear-gradient(to bottom right, #fff0f6, #ffffff)',
        minHeight: '100vh',
      }}
    >
      <Link className="btn mb-3" to={'/AddProduk'} style={{ backgroundColor: 'pink' }}>
        Add Produk
      </Link>
      <h2 className="mb-4 text-dark fw-bold">Daftar Produk</h2>
      <table className="table table-bordered text-center align-middle" style={{ borderColor: 'black' }}>
        <thead style={{ backgroundColor: '#f78da7', color: 'white' }}>
          <tr>
            <th style={{ borderColor: 'black' }}>ID</th>
            <th style={{ borderColor: 'black' }}>Nama Produk</th>
            <th style={{ borderColor: 'black' }}>Harga</th>
            <th style={{ borderColor: 'black' }}>Kategori</th>
            <th style={{ borderColor: 'black' }}>Foto Produk</th>
            <th style={{ borderColor: 'black' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((produk, index) => (
              <tr key={produk.id} style={{ backgroundColor: '#fff' }}>
                <td style={{ borderColor: 'black' }}>{index + 1}</td>
                <td style={{ borderColor: 'black' }}>{produk.name}</td>
                <td style={{ borderColor: 'black' }}>Rp {parseFloat(produk.price).toLocaleString('id-ID')}</td>
                <td style={{ borderColor: 'black' }}>{produk.Category?.name || '-'}</td>
                <td style={{ borderColor: 'black' }}>
                  <img
                    src={`http://localhost:5000/Products/${produk.photo}`} // sesuaikan path backend
                    alt={produk.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </td>
                <td style={{ borderColor: 'black' }}>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/UpdateStok/${produk.id}`)} // arahkan ke halaman update stok
                      style={{
                        backgroundColor: '#ff69b4',
                        border: 'none',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#ff85c1')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#ff69b4')}
                    >
                      Update Stok
                    </button>

                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(produk.id)}>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ borderColor: 'black' }}>
                Tidak ada data produk
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
