import { useState } from "react";
import { fetchUserByUsername, postNewUser } from "../api";

function LoginRegister({ loggedInUser, setLoggedInUser }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  // const [loggedInUser, setLoggedInUser] = useState(null);
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
      <div style={{ textAlign: "center" }}>
        <h2>Welcome, {loggedInUser.username}!</h2>
        <img
          src={loggedInUser.avatar_url}
          alt="avatar"
          style={{ width: "100px", borderRadius: "50%" }}
        />
        <br />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>{isRegistering ? "Register" : "Login"}</h2>

      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {isRegistering && (
        <>
          <label>Avatar URL:</label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />
        </>
      )}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Processing..." : isRegistering ? "Register" : "Login"}
      </button>

      <button
        type="button"
        onClick={() => {
          setIsRegistering((prev) => !prev);
          setError(null);
          resetForm();
        }}
      >
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default LoginRegister;
