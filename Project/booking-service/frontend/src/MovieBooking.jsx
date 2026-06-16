import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

function MovieBooking() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const timings = [
    "10:00 AM",
    "01:00 PM",
    "04:00 PM",
    "07:00 PM",
    "10:00 PM",
  ];

  const seats = [
    "A1","A2","A3","A4","A5","A6",
    "B1","B2","B3","B4","B5","B6",
    "C1","C2","C3","C4","C5","C6",
    "D1","D2","D3","D4","D5","D6",
    "E1","E2","E3","E4","E5","E6"
  ];

  useEffect(() => {
    loadMovies();
    loadTheatres();
  }, []);

  useEffect(() => {
    if (
      selectedMovie &&
      selectedTheatre &&
      selectedTime
    ) {
      loadBookedSeats();
    }
  }, [
    selectedMovie,
    selectedTheatre,
    selectedTime,
  ]);

  const loadMovies = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/movies"
      );

      setMovies(res.data);

      if (res.data.length > 0) {
        setSelectedMovie(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadTheatres = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/theatres"
      );

      setTheatres(res.data);

      if (res.data.length > 0) {
        setSelectedTheatre(
          res.data[0].theatre_name
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadBookedSeats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/bookings/seats",
        {
          params: {
            movieId: selectedMovie.id,
            theatreName: selectedTheatre,
            showTime: selectedTime,
          },
        }
      );

      setBookedSeats(
        res.data.map(
          (seat) => seat.seat_number
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeatClick = (seat) => {
    setMessage("");

    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter(
          (s) => s !== seat
        )
      );
    } else {
      setSelectedSeats([
        ...selectedSeats,
        seat,
      ]);
    }
  };

  const totalPrice =
    selectedSeats.length * 250;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  const confirmBooking = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (
      selectedSeats.length === 0
    ) {
      setMessage(
        "Please select seats."
      );
      setMessageType("error");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/bookings",
        {
          movieId:
            selectedMovie.id,

          theatreName:
            selectedTheatre,

          showTime:
            selectedTime,

          seats:
            selectedSeats,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setMessage(
        `✅ Booking Successful (${selectedSeats.join(", ")})`
      );

      setMessageType(
        "success"
      );

      setSelectedSeats([]);

      loadBookedSeats();

    } catch (error) {

      setMessage(
        error.response?.data
          ?.message ||
        "Booking Failed"
      );

      setMessageType(
        "error"
      );
    }
  };

  return (
    <div className="app">

      <nav
        className="navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
        }}
      >
        <h1>🎬 CineVerse</h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          {token ? (
            <>
              <span
                style={{
                  color: "#facc15",
                  fontWeight: "bold",
                }}
              >
                Welcome, {user?.name}
              </span>

              <button
                className="book-btn"
                style={{
                  width: "120px",
                  marginTop: 0,
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  className="book-btn"
                  style={{
                    width: "120px",
                    marginTop: 0,
                  }}
                >
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button
                  className="book-btn"
                  style={{
                    width: "120px",
                    marginTop: 0,
                  }}
                >
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>

      <section className="hero">
        <h1>
          Book Your Favorite Movie
        </h1>
        <br></br>
      </section>

      <section className="movies-section">
        <h2>Now Showing</h2>

        <div className="movie-grid">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className={`movie-card ${
                selectedMovie?.id === movie.id
                  ? "active-movie"
                  : ""
              }`}
              onClick={() => {
                setSelectedMovie(movie);
                setSelectedSeats([]);
                setMessage("");
              }}
            >
              <img
                src={movie.poster}
                alt={movie.title}
              />

              <h3>
                {movie.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <div className="selection-container">

        <div className="dropdown-box">
          <h3>Select Theatre</h3>

          <select
            value={selectedTheatre}
            onChange={(e) => {
              setSelectedTheatre(
                e.target.value
              );
              setMessage("");
            }}
          >
            {theatres.map(
              (theatre) => (
                <option
                  key={theatre.id}
                  value={
                    theatre.theatre_name
                  }
                >
                  {
                    theatre.theatre_name
                  }
                </option>
              )
            )}
          </select>
        </div>

        <div className="dropdown-box">
          <h3>
            Select Show Time
          </h3>

          <select
            value={selectedTime}
            onChange={(e) => {
              setSelectedTime(
                e.target.value
              );
              setMessage("");
            }}
          >
            {timings.map(
              (time) => (
                <option key={time}>
                  {time}
                </option>
              )
            )}
          </select>
        </div>

      </div>

      <div className="screen">
        SCREEN
      </div>

      <div className="seat-grid">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() =>
              handleSeatClick(
                seat
              )
            }
            className={
              bookedSeats.includes(
                seat
              )
                ? "seat booked"
                : selectedSeats.includes(
                    seat
                  )
                ? "seat selected"
                : "seat"
            }
          >
            {seat}
          </button>
        ))}
      </div>

      <div className="summary">

        <h2>
          Booking Summary
        </h2>

        <p>
          <strong>
            Movie:
          </strong>{" "}
          {selectedMovie?.title}
        </p>

        <p>
          <strong>
            Theatre:
          </strong>{" "}
          {selectedTheatre}
        </p>

        <p>
          <strong>
            Time:
          </strong>{" "}
          {selectedTime}
        </p>

        <p>
          <strong>
            Seats:
          </strong>{" "}
          {selectedSeats.length
            ? selectedSeats.join(", ")
            : "No Seats Selected"}
        </p>

        <h2>
          ₹{totalPrice}
        </h2>

        {message && (
          <p
            style={{
              marginTop: "15px",
              marginBottom: "15px",
              color:
                messageType ===
                "success"
                  ? "#22c55e"
                  : "#ef4444",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {message}
          </p>
        )}

        <button
          className="book-btn"
          onClick={
            confirmBooking
          }
        >
          Confirm Booking
        </button>

      </div>

    </div>
  );
}

export default MovieBooking;