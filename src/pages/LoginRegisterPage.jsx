import { useState } from "react";
import { fetchUserByUsername, postNewUser } from "../api";
import "../css/loggin.css";

function LoginRegister({ loggedInUser, setLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setUsername("");
    setName("");
    setAvatarUrl("");
  };

  const handleLogin = () => {
    fetchUserByUsername(username)
      .then(({ user }) => {
        if (user.name.toLowerCase() === name.toLowerCase()) {
          setLoggedInUser(user);
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          setError(null);
        } else {
          setError("Name does not match the username.");
        }
      })
      .catch(() => {
        setError("User not found.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegister = () => {
    if (!avatarUrl.trim()) {
      setError("Please provide an avatar URL or use a placeholder.");
      setIsLoading(false);
      return;
    }

    postNewUser({ username, name, avatar_url: avatarUrl })
      .then(({ user }) => {
        setLoggedInUser(user);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        setError(null);
      })
      .catch((err) => {
        setError(err.msg || "Failed to register.");
      })
      .finally(() => setIsLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !name.trim()) {
      setError("Please enter both a username and name.");
      return;
    }

    setError(null);
    setIsLoading(true);

    if (isRegistering) {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    resetForm();
  };

  if (loggedInUser) {
    return (
      <div className="page-container">
        <div className="page-glass">
          <div className="welcome-container">
            <h2 className="welcome-title">Welcome, {loggedInUser.username}!</h2>
            <img
              src={loggedInUser.avatar_url}
              alt="avatar"
              className="welcome-avatar"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-glass">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-header">
            <h2 className="form-title">
              {isRegistering ? "Register" : "Login"}
            </h2>
            <div className="form-underline"></div>
          </div>

          <p className="form-subtext">
            Dummy login: <br />
            <strong>Username:</strong> test <br />
            <strong>Name:</strong> test
          </p>

          <div className="input-group">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {isRegistering && (
            <div className="input-group">
              <label className="form-label">Avatar URL:</label>
              <input
                type="text"
                className="form-input"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          )}

          <button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {isLoading
              ? "🔄 Processing..."
              : isRegistering
              ? "✨ Register"
              : "🔐 Login"}
          </button>

          <button
            type="button"
            className="form-switch-button"
            onClick={() => {
              setIsRegistering((prev) => !prev);
              setError(null);
              resetForm();
            }}
          >
            {isRegistering ? "← Switch to Login" : "→ Switch to Register"}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;
