import { Link } from "react-router-dom";
import "../css/header.css";
import TopicsSearch from "./TopicsSearch";

function Header({ loggedInUser, setLoggedInUser }) {
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div className="header-container">
      <div className="header-glass">
        <div className="header-content">
          <div className="brand-section">
            <Link to="/" className="header-title-link">
              <h1 className="header-title">NC News</h1>
              <div className="brand-underline"></div>
            </Link>
          </div>

          <div className="search-section">
            <div className="search-container">
              <TopicsSearch />
            </div>
          </div>

          <div className="nav-section">
            <nav className="nav-buttons-container">
              <Link to="/" className="nav-button articles-btn">
                📰 Articles
              </Link>
              <Link to="/post" className="nav-button create-btn">
                ✨ Create
              </Link>
              {!loggedInUser ? (
                <Link to="/login" className="nav-button login-btn">
                  🔐 Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="nav-button logout-btn"
                >
                  🚪 Logout
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
