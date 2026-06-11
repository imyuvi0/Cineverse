import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("user");

  const handleLogin = () => {
    if (username.trim() === "") {
      alert("Please enter a username");
      return;
    }

    // Simulate JWT Authentication
    localStorage.setItem("token", "dummy-jwt-token");
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    alert("Login Successful");
  };

  return (
    <div>
      <h1>Login</h1>

      <div>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Select Role: </label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="theatreOwner">Theatre Owner</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;