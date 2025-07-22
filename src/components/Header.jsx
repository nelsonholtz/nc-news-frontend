import { Link } from "react-router-dom";
import "../css/header.css";

function Header({ loggedInUser, setLoggedInUser }) {
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

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

          {!loggedInUser ? (
            <Link to="/login" className="nav-button">
              login
            </Link>
          ) : (
            <div className="user-info">
              <img src={loggedInUser.avatar_url} alt="avatar" />
              <span>{loggedInUser.username}</span>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
