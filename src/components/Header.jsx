import { Link } from "react-router-dom";
import "../css/header.css";
import TopicsSearch from "./TopicsSearch";

function Header({ loggedInUser, setLoggedInUser }) {
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <div className="header-box">
      <div className="header-content">
        <h1 className="header-title">NC News</h1>

        <TopicsSearch />

        <div className="nav-buttons-container">
          {/* <Link to="/home" className="nav-button">
            Home Page
          </Link> */}
          <Link to="/articles" className="nav-button">
            Articles
          </Link>
          <Link to="/post" className="nav-button">
            + Create
          </Link>

          {!loggedInUser ? (
            <Link to="/login" className="nav-button">
              login
            </Link>
          ) : (
            <div className="user-info-container">
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
              <img
                src={loggedInUser.avatar_url}
                alt="avatar"
                className="user-avatar"
              />

              {/* <span className="user-username">{loggedInUser.username}</span> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
