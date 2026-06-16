require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const authRoutes = require("./routes/auth");
const movieRoutes = require("./routes/movies");
const theatreRoutes = require("./routes/theatres");
const showRoutes = require("./routes/shows");
const bookingRoutes = require("./routes/bookings");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("Booking Service Running");
});

app.get("/db-test", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Connection Failed",
      });
    }

    res.json({
      success: true,
      message: "Database Connected Successfully",
      result,
    });
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});