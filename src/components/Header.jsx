import { Link } from "react-router-dom";
import "../css/header.css";

function Header() {
  return (
    <div className="header-box">
      <div className="header-content">
        <h1 className="header-title">NC News</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search articles... (work in progress)"
            className="search-bar"
            disabled
          />
        </div>

        <div className="nav-buttons-container">
          <Link to="/home" className="nav-button">
            Home Page
          </Link>
          <Link to="/articles" className="nav-button">
            Article Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
