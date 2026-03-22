//implement router for update the request
const express = require("express");
const {connection} = require("../database/database");
require("dotenv").config();

// create router object
const router = express.Router();

// implement update router
router.put("/:id", (req, res) => {
  // get data from the frontend
  const { title, description, priority, status } = req.body;
  // get id from the request paramater
  const { id } = req.params;
  //create database query for update the table
  const query = `UPDATE  ${process.env.T_NAME} SET title=? , description=? ,priority=? , status=? WHERE id=?`;
  // send the query command to the database
  connection.query(
    query,
    [title, description, priority, status, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Feature not found" });
      } else {
        return res.json({ message: "Feature updated" });
      }
    },
  );
}); // end of the router

module.exports = router;
