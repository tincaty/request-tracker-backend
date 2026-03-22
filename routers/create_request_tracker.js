const express = require("express");
const { connection } = require("../database/database");
require("dotenv").config();
//create router object
const router = express.Router();

// create router implementation
router.post("/", (req, res) => {
  // data receive from the frontend
  const { title, description, priority, status } = req.body;

  // check if all json data present  and return error message  to the user
  if (!title || !description) {
    return res.status(400).json({
      message: "title and description  are required",
    });
  }

  // create query for database to insert data on the table
  const query = `INSERT INTO ${process.env.T_NAME}(title, description, priority, status )VALUES(?,?,?,?)`;

  // send the query on the database
  connection.query(
    query,
    [title, description, priority || "Median", status || "Open"],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Fails  to create tracker request",
        });
      } else {
        // Fetch the inserted row by insertId
        const selectQuery = `SELECT * FROM ${process.env.T_NAME} WHERE id = ?`;
        connection.query(selectQuery, [result.insertId], (err2, rows) => {
          if (err2) return res.status(500).json({ message: err2.message });

          // convert snake_case to camelCase
          const feature = {
            id: rows[0].id,
            title: rows[0].title,
            description: rows[0].description,
            priority: rows[0].priority,
            status: rows[0].status,
            createdAt: rows[0].created_at,
          };

          return res
            .status(201)
            .json( feature );
        });
      }
    },
  );
}); //end of the router

// export the router for server implementation
module.exports = router;
