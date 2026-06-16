const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/", (req, res) => {
  db.query(
    `
    SELECT
      shows.id,
      movies.title,
      theatres.theatre_name,
      shows.show_time
    FROM shows
    JOIN movies
      ON movies.id = shows.movie_id
    JOIN theatres
      ON theatres.id = shows.theatre_id
    `,
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

module.exports = router;