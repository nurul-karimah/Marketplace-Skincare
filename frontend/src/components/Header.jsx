import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
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
  );
};

export default Header;
