import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function MenuLainnya() {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'Produk',
      subtitle: 'Lihat dan kelola produk',
      color: 'primary',
      icon: 'bi-box-seam',
      route: '/admin/products',
    },
    {
      title: 'Shippings',
      subtitle: 'Atur wilayah dan biaya pengiriman',
      color: 'success',
      icon: 'bi-truck',
      route: '/DataShipping',
    },
    {
      title: 'Couriers',
      subtitle: 'Kelola data kurir pengantar',
      color: 'warning',
      icon: 'bi-person-badge',
      route: '/DataCourier',
    },
    {
      title: 'Stok Produk',
      subtitle: 'Pantau ketersediaan stok',
      color: 'danger',
      icon: 'bi-clipboard-data',
      route: '/admin/stok-produk',
    },
  ];

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-5">Dashboard Admin</h2>

      <div className="row g-4">
        {cardData.map((card, index) => (
          <div className="col-12 col-sm-6 col-lg-3" key={index}>
            <div
              className={`card shadow-sm border-0 text-center p-4 h-100 card-hover`}
              onClick={() => navigate(card.route)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: '20px',
              }}
            >
              <div className="card-body">
                <div
                  className={`rounded-circle bg-${card.color}-subtle text-${card.color} d-inline-flex justify-content-center align-items-center mb-3`}
                  style={{
                    width: '70px',
                    height: '70px',
                    fontSize: '2rem',
                  }}
                >
                  <i className={`bi ${card.icon}`}></i>
                </div>
                <h5 className="fw-bold">{card.title}</h5>
                <p className="text-muted small">{card.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
