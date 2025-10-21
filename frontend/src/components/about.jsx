import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import herBg from '../assets/images/hero-bg.jpg';
import aboutImg from '../assets/images/about-img.png';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <div className="hero_area">
        <div className="bg-box">
          <img src={herBg} alt="" />
        </div>
        <header className="header_section" style={{ color: 'black' }}>
          <div className="container">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <a className="navbar-brand" href="/" style={{ color: 'black' }}>
                <span style={{ color: 'black', fontWeight: 'bold' }}>Natural Nusantara</span>
              </a>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto">
                  <li className="nav-item active">
                    <Link className="nav-link" to={'/'} style={{ color: 'black' }}>
                      Home <span className="sr-only">(current)</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/produk'} style={{ color: 'black' }}>
                      Produk
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/about'} style={{ color: 'black' }}>
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/book" style={{ color: 'black' }}>
                      Book Table
                    </a>
                  </li>
                </ul>

                <div className="user_option">
                  <Link to={'/LoginAdmin'} className="user_link" style={{ color: 'black' }}>
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
                </div>
              </div>
            </nav>
          </div>
        </header>
        <section className="about_section layout_padding">
          <div className="container  ">
            <div className="row">
              <div className="col-md-6 ">
                <div className="img-box">
                  <img src={aboutImg} alt="" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="heading_container">
                    <h2>We Are Natural Nusantara</h2>
                  </div>
                  <p>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going
                    to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All
                  </p>
                  <a href="">Read More</a>
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
