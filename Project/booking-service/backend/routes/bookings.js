const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

/*
GET ALL BOOKINGS
*/
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM bookings",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

/*
GET BOOKED SEATS
*/
router.get("/seats", (req, res) => {

  const movieId = req.query.movieId;
  const theatreName = req.query.theatreName;
  const showTime = req.query.showTime;

  db.query(
    `
    SELECT seat_number
    FROM bookings
    WHERE movie_id = ?
    AND theatre_name = ?
    AND show_time = ?
    `,
    [
      movieId,
      theatreName,
      showTime,
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

/*
SAVE BOOKING
*/
router.post(
  "/",
  authMiddleware,
  (req, res) => {

    const userId = req.user.id;

    const {
      movieId,
      theatreName,
      showTime,
      seats,
    } = req.body;

    const values = seats.map((seat) => [
      userId,
      movieId,
      theatreName,
      showTime,
      seat,
    ]);

    db.query(
      `
      INSERT INTO bookings
      (
        user_id,
        movie_id,
        theatre_name,
        show_time,
        seat_number
      )
      VALUES ?
      `,
      [values],
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          success: true,
          message: "Booking Saved",
        });

      }
    );
  }
);

module.exports = router;