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

        <Link to="/articles" className="nav-button">
          Article Page
        </Link>
      </div>
    </div>
  );
}

export default Header;
