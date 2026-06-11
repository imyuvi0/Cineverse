function MovieCard({ movie }) {
  const handleBooking = () => {
    alert(`Ticket booked for ${movie.title}`);
  };

  return (
    <div className="movie-card">
      <img
        src={movie.poster}
        alt={movie.title}
        width="200"
      />

      <h3>{movie.title}</h3>

      <p>Year: {movie.year}</p>

      <button
  onClick={handleBooking}
  style={{
    padding: "12px 24px",
    fontSize: "16px",
    marginTop: "10px",
    cursor: "pointer",
    borderRadius: "5px",
  }}
>
  Book Ticket
</button>
    </div>
  );
}

export default MovieCard;