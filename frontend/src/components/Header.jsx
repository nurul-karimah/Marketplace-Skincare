import { Link } from 'react-router-dom';
const Header = () => {
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
                <Link className="nav-link" to={'/menu'} style={{ color: 'black' }}>
                  Menu
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
              <a href="/" className="user_link" style={{ color: 'black' }}>
                <i className="fa fa-user" aria-hidden="true"></i>
              </a>

              <a className="cart_link" href="/" style={{ color: 'black' }}>
                Cart
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
  );
};

export default Header;
