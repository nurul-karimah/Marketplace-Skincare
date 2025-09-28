import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <a className="navbar-brand" href="/">
            <span>Feane</span>
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className=""> </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={'/'}>
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/menu'}>
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/about'}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/book">
                  Book Table
                </a>
              </li>
            </ul>

            <div className="user_option">
              <a href="/" className="user_link">
                <i className="fa fa-user" aria-hidden="true"></i>
              </a>

              <a className="cart_link" href="/">
                {/* SVG bisa dibiarkan inline atau di pisahkan jadi komponen */}
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.029 456.029" style={{ enableBackground: 'new 0 0 456.029 456.029' }}>
                  <g>
                    <path
                      d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                   c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                    />
                  </g>
                </svg>
              </a>

              <form className="form-inline">
                <button className="btn my-2 my-sm-0 nav_search-btn" type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>

              <a href="/" className="order_online">
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
