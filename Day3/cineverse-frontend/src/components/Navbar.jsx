import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        padding: "15px",
        backgroundColor: "#222",
        marginBottom: "20px",
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          marginRight: "15px",
          textDecoration: "none",
        }}
      >
        Home
      </Link>

      <Link
        to="/movies"
        style={{
          color: "white",
          marginRight: "15px",
          textDecoration: "none",
        }}
      >
        Movies
      </Link>

      <Link
        to="/profile"
        style={{
          color: "white",
          marginRight: "15px",
          textDecoration: "none",
        }}
      >
        Profile
      </Link>

      <Link
        to="/login"
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        Login
      </Link>
    </nav>
  );
}

export default Navbar;