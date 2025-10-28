import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import herBg from '../assets/images/hero-bg.jpg';
import aboutImg from '../assets/images/about-img.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Link, useNavigate } from 'react-router-dom';

export default function Book() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    alert('Anda telah logout!');
    setUser(null);
    navigate('/');
  };

  return (
    <>
      <div className="hero_area">
        <div className="bg-box">
          <img src={herBg} alt="" />
        </div>
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
        <section className="book_section layout_padding">
          <div className="container">
            <div className="heading_container">
              <h2>Book A Table</h2>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form_container">
                  <form action="">
                    <div>
                      <input type="text" className="form-control" placeholder="Your Name" />
                    </div>
                    <div>
                      <input type="text" className="form-control" placeholder="Phone Number" />
                    </div>
                    <div>
                      <input type="email" className="form-control" placeholder="Your Email" />
                    </div>
                    <div>
                      <select className="form-control nice-select wide">
                        <option value="" disabled selected>
                          How many produk?
                        </option>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                        <option value="">6</option>
                        <option value="">7</option>
                        <option value="">8</option>
                        <option value="">9</option>
                      </select>
                    </div>
                    <div>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="btn_box">
                      <button>Book Now</button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="map_container ">
                  <div id="googleMap"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
      </div>
    </>
  );
}
