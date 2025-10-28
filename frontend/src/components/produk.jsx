import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from 'axios';
import herBg from '../assets/images/hero-bg.jpg';
import f1 from '../assets/images/f1.png';
import f2 from '../assets/images/f2.png';
import f3 from '../assets/images/f3.png';
import f4 from '../assets/images/f4.png';
import f5 from '../assets/images/f5.png';
import f6 from '../assets/images/f6.png';
import f7 from '../assets/images/f7.png';
import f8 from '../assets/images/f8.png';
import f9 from '../assets/images/f9.png';
import f11 from '../assets/images/f11.jpeg';
import f12 from '../assets/images/f12.jpeg';
import f13 from '../assets/images/f13.jpeg';
import f14 from '../assets/images/f14.jpeg';
import f15 from '../assets/images/f15.jpeg';
import f16 from '../assets/images/f16.webp';
import f17 from '../assets/images/f17.jpeg';
import f18 from '../assets/images/f18.jpg';
import client1 from '../assets/images/client1.jpg';
import client2 from '../assets/images/client2.jpg';
export default function Produk() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleCartClick = (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Silakan daftar atau login terlebih dahulu sebelum memesan.');
      navigate('/LoginUser'); // arahkan ke halaman register
    } else {
      navigate(`/CreateOrder/${productId}`); // langsung ke halaman create order
    }
  };

  // Ambil data dari backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/productsCategori'); // sesuai route backend
        // mapping hasil supaya mudah dipakai
        const mapped = res.data.map((p) => ({
          id: p.id,
          title: p.name,
          price: p.price,
          description: p.description,
          img: `http://localhost:5000/products/${p.photo}`, // <- langsung ambil file statis
          category: p.Category?.name?.toLowerCase() || 'other',
        }));

        setProducts(mapped);
      } catch (err) {
        console.error('Gagal fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Filter produk sesuai kategori
  const filteredProducts = activeFilter === 'all' ? products : products.filter((p) => p.category === activeFilter);

  useEffect(() => {
    // Ambil user dari localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Anda telah logout!');
    setUser(null);
    navigate('/'); // arahkan ke halaman utama
  };

  return (
    <>
      <div className="hero_area">
        <header className="header_section" style={{ color: 'black', position: 'relative', zIndex: 10 }}>
          <div className="container">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              {/* ✅ Brand */}
              <a className="navbar-brand" href="/" style={{ color: 'black' }}>
                <span style={{ color: 'black', fontWeight: 'bold' }}>Natural Nusantara</span>
              </a>

              {/* ✅ Tambahkan tombol toggle (untuk mobile) */}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              {/* ✅ Menu navigasi */}
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to="/" style={{ color: 'black' }}>
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/produk" style={{ color: 'black' }}>
                      Produk
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about" style={{ color: 'black' }}>
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/book" style={{ color: 'black' }}>
                      Book Table
                    </a>
                  </li>
                </ul>

                {/* ✅ User Options */}
                <div className="user_option d-flex align-items-center gap-3 flex-wrap">
                  {!user ? (
                    <>
                      <Link to="/LoginAdmin" className="user_link" style={{ color: 'black' }}>
                        <i className="fa fa-user" aria-hidden="true"></i>
                      </Link>

                      <a className="cart_link" href="/" style={{ color: 'black' }}>
                        <i className="fa fa-cart" aria-hidden="true"></i>
                      </a>

                      <form className="form-inline">
                        <button className="btn my-2 my-sm-0 nav_search-btn" type="submit" style={{ color: 'black' }}>
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                      </form>

                      <a href="/" className="order_online" style={{ color: 'black' }}>
                        Order Online
                      </a>
                    </>
                  ) : (
                    <>
                      <button onClick={() => navigate('/User')} className="btn btn-outline-dark btn-sm">
                        <i className="fa fa-user"></i> Kembali ke User
                      </button>

                      <button onClick={handleLogout} className="btn btn-danger btn-sm">
                        <i className="fa fa-sign-out"></i> Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </header>
        <section
          className="food_section"
          style={{
            paddingTop: 0, // hilangkan padding atas
            marginTop: 20, // hilangkan margin atas
            marginBottom: 20,
          }}
        >
          <div className="container">
            <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          border-radius: 15px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          background-color: #fff;
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .img-box {
          width: 100%;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-box {
          padding: 15px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .row.grid {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .col-sm-6.col-lg-4 {
          display: flex;
        }

        .filters_menu {
          display: flex;
          justify-content: center;
          list-style: none;
          padding: 0;
          margin-bottom: 25px;
          gap: 15px;
        }

        .filters_menu li {
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 20px;
          transition: 0.3s;
          background-color: #f2f2f2;
        }

        .filters_menu li.active {
          background-color: #ffc107;
          color: #fff;
        }

        .filters_menu li:hover {
          background-color: #ffe082;
        }

        .btn-box {
          text-align: center;
          margin-top: 30px;
        }

        .btn-box a {
          background-color: #ffc107;
          color: white;
          padding: 10px 20px;
          border-radius: 30px;
          text-decoration: none;
          transition: 0.3s;
        }

        .btn-box a:hover {
          background-color: #ffb300;
        }
      `}</style>
            <div className="heading_container heading_center">
              <h2>Our Produk</h2>
            </div>

            <ul className="filters_menu">
              <li className={activeFilter === 'all' ? 'active' : ''} onClick={() => setActiveFilter('all')}>
                All Product
              </li>
              <li className={activeFilter === 'skincare' ? 'active' : ''} onClick={() => setActiveFilter('skincare')}>
                Skincare
              </li>
              <li className={activeFilter === 'bodycare' ? 'active' : ''} onClick={() => setActiveFilter('bodycare')}>
                Body Care
              </li>
            </ul>

            <div className="filters-content">
              <div className="row grid">
                {filteredProducts.map((product) => (
                  <div key={product.id} className={`col-sm-6 col-lg-4 all ${product.category}`}>
                    <div className="box product-card">
                      <div className="img-box">
                        <img src={product.img} alt={product.title} />
                      </div>
                      <div className="detail-box">
                        <h5>{product.title}</h5>
                        <p style={{ fontFamily: 'Arial, sans-serif' }}>{product.description || 'Deskripsi belum ada'}</p>
                        <div className="options">
                          <h6>Rp.{product.price}</h6>
                          <button
                            onClick={() => handleCartClick(product.id)}
                            className="cart-btn"
                            style={{
                              backgroundColor: '#ffc107',
                              borderRadius: '50%',
                              border: 'none',
                              padding: '10px 14px',
                              cursor: 'pointer',
                              fontSize: '20px',
                            }}
                          >
                            🛒
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="btn-box">
              <a href="">View More</a>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer_section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 footer-col">
              <div className="footer_contact">
                <h4>Contact Us</h4>
                <div className="contact_link_box">
                  <a href="">
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    <span> Location </span>
                  </a>
                  <a href="">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <span> Call +62 1234567890 </span>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <span> herbalbeauty@gmail.com </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 footer-col">
              <div className="footer_detail">
                <a href="" className="footer-logo">
                  {' '}
                  Natural Nusantara{' '}
                </a>
                <p>Pola bisnis NASA telah membantu banyak orang mengatasi persoalan ekonomi dan mengatasi pengangguran serta mendorong bertumbuh kembangnya wirausaha (SOCIOPRENEUR)</p>
                <div className="footer_social">
                  <a href="">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-pinterest" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 footer-col">
              <h4>Free Konsultasi</h4>
              <p>Everyday</p>
              <p>08.00 Am -10.00 Pm</p>
              <p>WhatsApp 085-922-133-766</p>
            </div>
          </div>
          <div className="footer-info">
            <p>
              &copy; <span id="displayYear"></span> All Rights Reserved By <a href="https://html.design/">Design Herbalis</a>
              <br />
              <br />
              &copy; <span id="displayYear"></span> Distributed By <tr></tr>
              <a to="hhttps://naturalnusantara.co.id//" target="_blank">
                Natural_Nusantara
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
