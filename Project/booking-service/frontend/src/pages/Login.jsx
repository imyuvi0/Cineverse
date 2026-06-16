import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage("✅ Login Successful");
      setMessageType("success");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Login Failed"
      );

      setMessageType("error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
          width: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        {message && (
          <p
            style={{
              marginBottom: "15px",
              color:
                messageType ===
                "success"
                  ? "#22c55e"
                  : "#ef4444",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#facc15",
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;