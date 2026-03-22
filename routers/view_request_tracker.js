// implement router for veiwing features
const express = require("express");
const {connection} = require("../database/database");
require("dotenv").config();

// creating a routing object
const router = express.Router();

// implement the router
router.get("/", (req, res) => {
  // create a query for getting all features on the database
  const query = `SELECT * FROM ${process.env.T_NAME}`;
  connection.query(query, [], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } 
      // convert snake_case to camelCase for frontend representation
    const formatted = results.map(row => ({
      id: row.id,
      title: row.title,
      description: row.description,
      priority: row.priority,
      status: row.status,
      createdAt: row.created_at,
    }));

    return res.json(formatted);
  });
}); // end of the router

module.exports = router;
