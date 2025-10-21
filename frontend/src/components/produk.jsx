import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

                <div className="user_option d-flex align-items-center gap-3">
                  {/* ✅ Jika belum login */}
                  {!user && (
                    <>
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
                    </>
                  )}

                  {/* ✅ Jika sudah login */}
                  {user && (
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
            <div className="heading_container heading_center">
              <h2>Our Produk</h2>
            </div>

            <ul className="filters_menu">
              <li className="active" data-filter="*">
                All
              </li>
              <li data-filter=".burger">Skincare</li>
              <li data-filter=".pizza">Bodycare</li>
            </ul>

            <div className="filters-content">
              <div className="row grid">
                <div className="col-sm-6 col-lg-4 all produk">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f1} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>Body Wash Moreskin </h5>
                        <p style={{ textAlign: 'justify' }}>
                          Body wash Moreskin bervariasi tergantung variannya, seperti mencerahkan kulit (Nature, Glow, Yogurt), melembapkan (Yogurt, Nature), dan mengurangi jerawat punggung (Glow), berkat kandungan bahan alami seperti
                          ekstrak yogurt, biji mentimun, dan alpha arbutin.
                        </p>{' '}
                        <p> Cara memakainya adalah dengan membahasi tubuh, menuangkan secukupnya ke tangan atau spon, mengusapkannya ke seluruh tubuh hingga berbusa, lalu membilasnya hingga bersih. </p>{' '}
                        <div className="options">
                          <h6>$20</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all burger">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f2} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>Collaskin Body Lotion</h5>
                        <p style={{ textAlign: 'justify' }}>
                          Bermanfaat untuk mencerahkan, melembapkan, dan menutrisi kulit tubuh agar lebih kenyal, halus, dan tampak lebih muda dengan meningkatkan elastisitas kulit dan menghambat penuaan dini.
                        </p>{' '}
                        <p> Cara pakainya adalah setelah mandi, keringkan tubuh hingga benar-benar kering, lalu tuangkan sedikit lotion ke telapak tangan dan usapkan secara merata ke seluruh permukaan kulit, minimal dua kali sehari. </p>{' '}
                        <div className="options">
                          <h6>$15</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all pizza">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f3} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>Erhsali Feeling Spray</h5>
                        <p style={{ textAlign: 'justify' }}>
                          Bermanfaat membersihkan kotoran dan sel kulit mati, membuat kulit tampak lebih bersih, halus, dan cerah, serta membantu menjaga kelembapan kulit berkat kandungan Caviar Extract.
                        </p>{' '}
                        <p> Cara pakainya adalah dengan menyemprotkan ke area kulit yang diinginkan, lalu menggosoknya perlahan hingga kotoran dan kulit mati terangkat, kemudian bilas dengan air bersih. </p>{' '}
                        <div className="options">
                          <h6>$17</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all pasta">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f4} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>Body Lotion Mashmallow</h5>
                        <p style={{ textAlign: 'justify' }}>Manfaat mencerahkan kulit, melembapkan, dan menghaluskan tubuh berkat kandungan ekstrak mulberry dan olive oil. </p>{' '}
                        <p> cara pakainya, oleskan secukupnya pada telapak tangan lalu ratakan ke seluruh bagian tubuh terutama setelah mandi agar penyerapan maksimal dan kulit tetap lembap sepanjang hari. </p>
                        <div className="options">
                          <h6>$18</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all fries">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f5} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>Moreskin Body Butter Whitening Gold </h5>
                        <p style={{ textAlign: 'justify' }}>
                          Manfaat membantu melembabkan kulit sehingga kulit tidak kering dan tetap lembut serta membantu mencerahkan kulit. Lulur ini dapat menghilangkan Daki dan mencerahkan Kulit secara alami.
                        </p>
                        <div className="options">
                          <h6>$10</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all pizza">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f6} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>Soap Rainbow Nasa</h5>
                        <p style={{ textAlign: 'justify' }}>
                          Rainbow Soap Nasa bermanfaat untuk mencerahkan kulit, menghaluskan, menjaga kelembapan, dan meremajakan kulit dengan mengangkat sel kulit mati serta melindungi dari radikal bebas.
                        </p>
                        <p> Cara pakainya adalah dengan mengusapkan atau menggosokkan sabun secara lembut ke seluruh tubuh saat mandi, lalu membilasnya hingga bersih dengan air. </p>
                        <div className="options">
                          <h6>$15</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all burger">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f7} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>Shampo Shanas</h5>
                        <p style={{ textAlign: 'justify' }}>Shampo Shanas memiliki manfaat untuk membersihkan rambut, menjaga kelembapan, kilau, dan kesehatan rambut, serta menguatkan rambut dari kerusakan.</p>
                        <p> Untuk menggunakannya, aplikasikan shampo pada rambut yang bersih dan kering, pijat secara merata ke kulit kepala, diamkan selama 15-20 menit (untuk varian pewarna rambut), lalu bilas hingga bersih. </p>
                        <div className="options">
                          <h6>$12</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all burger">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f8} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>GRECE Body Crystal Nasa</h5>
                        <p style={{ textAlign: 'justify' }}>
                          Grace Nasa, atau yang dikenal sebagai GRECE Body Crystal Nasa, adalah kristal alami yang digunakan untuk menghilangkan bau badan dengan cara mengusapkannya pada area yang rentan bau seperti ketiak dan sela-sela
                          jari kaki setelah mandi dan mengeringkan tubuh. Cara pakainya adalah dengan membasahi kristal dengan air, kemudian usapkan ke area tubuh yang berbau.{' '}
                        </p>
                        <div className="options">
                          <h6>$14</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all pasta">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f11} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>Lacoco 5% Baquchiol Essence</h5>
                        <p style={{ textAlign: 'justify' }}>Bermanfaat untuk anti-penuaan, anti-jerawat, mencerahkan kulit kusam, dan meratakan warna kulit.</p>
                        <p>
                          {' '}
                          Cara pakainya adalah dengan menggunakan 2-4 tetes essence ke wajah dan leher yang bersih, pada pagi dan malam hari. Setelahnya, di pagi hari, gunakan tabir surya dan hindari paparan sinar matahari berlebihan.{' '}
                        </p>
                        <div className="options">
                          <h6>$10</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all pizza">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f13} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5> Lacoco Grape Serum </h5>
                        <p style={{ textAlign: 'justify' }}>
                          Masker tidur yang berfungsi untuk mencerahkan, melembapkan, dan mengenyalkan kulit wajah, serta melawan tanda penuaan dini dan memudarkan bekas jerawat. Masker ini diaplikasikan setelah rutinitas perawatan wajah
                          lainnya, dibiarkan semalaman, dan dibilas keesokan paginya untuk mendapatkan kulit yang lebih sehat, cerah, dan kenyal.{' '}
                        </p>
                        <div className="options">
                          <h6>$15</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all pizza">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f12} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>Lacoco Aloe Vera Soothing Mist</h5>
                        <p style={{ textAlign: 'justify' }}>
                          Bermanfaat untuk membersihkan, melembapkan, dan menenangkan kulit wajah, serta dapat digunakan sebagai alas makeup dan penyegar. Cara pakainya adalah dengan menyemprotkannya langsung ke wajah dari jarak 10-15 cm
                          sebagai toner atau penyegar, atau menyemprotkannya pada kapas lalu mengusapkannya perlahan ke wajah sebagai pembersih.{' '}
                        </p>
                        <div className="options">
                          <h6>$15</h6>
                          <a href="">
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
                <div className="col-sm-6 col-lg-4 all pasta">
                  <div className="box">
                    <div>
                      <div className="img-box">
                        <img src={f9} alt="" />
                      </div>
                      <div className="detail-box">
                        <h5>Lacoco Dark Spot Essence </h5>
                        <p style={{ textAlign: 'justify' }}>Manfaat Lacoco Dark Spot Essence antara lain memudarkan flek hitam dan bekas jerawat, mencerahkan kulit, menghaluskan tekstur kulit, serta mengatasi pori-pori tersumbat. </p>
                        <p>
                          Cara pakainya adalah setelah toner dan sebelum moisturizer di malam hari, dengan cara diaplikasikan 3-4 tetes ke wajah secara merata, lalu biarkan meresap. Untuk hasil maksimal, gunakan secara rutin 2-3 kali
                          seminggu dan wajib menggunakan sunscreen keesokan harinya.{' '}
                        </p>
                        <div className="options">
                          <h6>$10</h6>
                          <a href="">
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
