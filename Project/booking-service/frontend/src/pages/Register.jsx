import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [messageType,
    setMessageType] =
    useState("");

  const handleRegister =
    async () => {

      try {

        await axios.post(
          "http://localhost:8000/api/auth/register",
          {
            name,
            email,
            password,
          }
        );

        setMessage(
          "✅ Registration Successful"
        );

        setMessageType(
          "success"
        );

        setTimeout(() => {
          navigate("/login");
        }, 1000);

      } catch (error) {

        setMessage(
          error.response?.data
            ?.message ||
            "Registration Failed"
        );

        setMessageType(
          "error"
        );

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
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
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
          onClick={
            handleRegister
          }
          style={{
            width: "100%",
            padding: "12px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#facc15",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;