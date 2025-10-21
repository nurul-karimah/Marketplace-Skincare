import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import herBg from '../assets/images/hero-bg.jpg';
import aboutImg from '../assets/images/about-img.png';
import o1 from '../assets/images/o1.jpg';
import o2 from '../assets/images/o2.jpg';
import f1 from '../assets/images/f1.png';
import f2 from '../assets/images/f2.png';
import f3 from '../assets/images/f3.png';
import f4 from '../assets/images/f4.png';
import f5 from '../assets/images/f5.png';
import f6 from '../assets/images/f6.png';
import f8 from '../assets/images/f8.png';
import f9 from '../assets/images/f9.png';
import f10 from '../assets/images/f10.jpg';
import f11 from '../assets/images/f11.jpeg';
import f12 from '../assets/images/f12.jpeg';
import f13 from '../assets/images/f13.jpeg';
import f14 from '../assets/images/f14.jpeg';
import f15 from '../assets/images/f15.jpeg';
import client1 from '../assets/images/client1.jpg';
import client2 from '../assets/images/client2.jpg';
import Header from './Header';
import { Link } from 'react-router-dom';

const slides = [
  {
    img: client1,
    name: 'Nurul',
    comment: 'Produk Herbal yang terbukti keherbalan alaminya...',
    subtext: 'Dark Spot Essence',
  },
  {
    img: client2,
    name: 'Mike Hamell',
    comment: 'Consectetur adipiscing elit...',
    subtext: 'Lacoco',
  },
];

const heroSlides = [
  {
    title: 'Natural Nusantara Beauty – Cantik Alami, Bersinar Sejati',
    text: 'Rasakan keajaiban perawatan kulit alami dengan rangkaian skincare Natural Nusantara. Diformulasikan dari bahan-bahan terbaik alam Indonesia, membantu kulit tampak sehat, cerah, dan terawat. Saatnya tampil percaya diri dengan kecantikan alami yang memikat.',
  },
  {
    title: 'Rahasia Kulit Glowing Ada di Alam',
    text: 'Dengan sentuhan alami dari Natural Nusantara, kulitmu mendapatkan nutrisi yang sesungguhnya. Produk perawatan kami hadir untuk membantu melembapkan, mencerahkan, dan menjaga kecantikan kulit dari dalam. Saatnya buktikan pesona cantik alami yang tahan lama!',
  },
  {
    title: 'Skincare Alami, Pesona Tak Terbantahkan',
    text: 'Natural Nusantara menghadirkan rangkaian produk kecantikan yang dirancang untuk kulit wanita Indonesia. Diperkaya dengan bahan alami, skincare ini mampu menjaga kelembutan, kecerahan, dan kesehatan kulit wajahmu setiap hari.',
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

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

  // Slide otomatis setiap 3 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          border: 1px solid #eee;
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
        }
.product-card .img-box img {
  width: 100%;
  height: auto;
  object-fit: scale-down;
}


        .product-card p {
          font-family: Arial, sans-serif;
        }

        .cart-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #FFD700;
          color: black;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          text-decoration: none;
          font-size: 18px;
          transition: 0.3s;
        }

        .cart-btn:hover {
          background: #e6c200;
        }
      `}</style>
      <div className="hero_area">
        <div
          className="bg-box"
          style={{
            backgroundImage: `url(${herBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            aspectRatio: '16/9', // selalu jaga rasio
            width: '100%',
          }}
        ></div>

        <Header />

        <section className="slider_section">
          <div id="customCarousel1" className="carousel slide" data-ride="carousel">
            <div className="hero_area">
              <div className="container">
                <div className="row">
                  <div className="col-md-7 col-lg-6">
                    <div className="detail-box" style={{ color: 'black' }}>
                      <h1>{heroSlides[current].title}</h1>
                      <p>{heroSlides[current].text}</p>
                      <div className="btn-box">
                        <a href="/" className="btn1" style={{ backgroundColor: '#e67e22', color: 'white' }}>
                          Order Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="offer_section layout_padding-bottom">
        <div className="offer_container">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="box">
                  <div className="img-box">
                    <img src={f9} alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Dark Spot Essence</h5>
                    <h6>
                      <span>20%</span> Off
                    </h6>
                    <a href="">
                      Order Now
                      <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 456.029 456.029"
                        style={{ enablebackground: 'new 0 0 456.029 456.029' }}
                        xml:space="preserve"
                      >
                        <g>
                          <g>
                            <path
                              d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                     c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                     C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                     c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                     C457.728,97.71,450.56,86.958,439.296,84.91z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                     c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                            />
                          </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="box">
                  <div className="img-box">
                    <img src={f5} alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>Moreskin Body Butter Whitening Gold</h5>
                    <h6>
                      <span>15%</span> Off
                    </h6>
                    <a href="">
                      Order Now
                      <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 456.029 456.029"
                        style={{ enablebackground: 'new 0 0 456.029 456.029' }}
                        xml:space="preserve"
                      >
                        <g>
                          <g>
                            <path
                              d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                     c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                     C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                     c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                     C457.728,97.71,450.56,86.958,439.296,84.91z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                     c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                            />
                          </g>
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="food_section layout_padding-bottom">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Our Product</h2>
          </div>

          <div className="product-section">
            {/* Filter Menu */}
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

            {/* Product List */}
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
          </div>

          <div className="btn-box">
            <a href=""> View More </a>
          </div>
        </div>
      </section>

      <section className="about_section layout_padding">
        <div className="container">
          <div className="row">
            {/* Bagian gambar */}
            <div className="col-md-6">
              <div className="img-box">
                <img src={aboutImg} alt="About Feane" />
              </div>
            </div>

            {/* Bagian teks */}
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2>We Are Natural Nusantara</h2>
                </div>
                <p style={{ textAlign: 'justify' }}>
                  PT Natural Nusantara (NASA) adalah perusahaan asli Indonesia yang didirikan pada Oktober 2002 di Yogyakarta, berfokus pada distribusi produk agrokompleks, kesehatan, kosmetik, dan perawatan tubuh berbasis organik dan
                  herbal. Perusahaan ini memiliki visi untuk mewujudkan hidup yang bahagia dan sejahtera selaras alam, serta berupaya memberdayakan sumber daya alam dan manusia melalui produk yang ramah lingkungan dan karya anak bangsa.
                  Kantor pusat PT NASA terletak di Jalan Ring Road Barat 72 Salaka, Trihanggo, Gamping, Sleman, Yogyakarta.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                      <option value="">2</option>
                      <option value="">3</option>
                      <option value="">4</option>
                      <option value="">5</option>
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
              <div className="map_container">
                <div id="googleMap"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: '50px 0',
          background: 'linear-gradient(135deg, #000000, #1a1a1a)',
          color: '#fff',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '40px' }}>What Says Our Customers</h2>

          <div style={{ position: 'relative', height: '350px' }}>
            {slides.map((slide, index) => (
              <div
                key={index}
                style={{
                  display: index === current ? 'block' : 'none',
                  transition: 'opacity 0.5s ease-in-out',
                  position: 'absolute',
                  width: '100%',
                  top: 0,
                  left: 0,
                }}
              >
                <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>{slide.comment}</p>
                <h6 style={{ marginBottom: '15px', fontWeight: 'bold' }}>{slide.name}</h6>
                <p style={{ marginBottom: '20px' }}>{slide.subtext}</p>
                <img
                  src={slide.img}
                  alt={slide.name}
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto',
                    display: 'block',
                    border: '4px solid #fff',
                  }}
                />
              </div>
            ))}
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
    </>
  );
}
