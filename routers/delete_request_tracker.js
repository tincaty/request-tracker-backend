// implementation router for  delete
const express = require("express");
const { connection } = require("../database/database");
require("dotenv").config();

// create router  object
const router = express.Router();

// implement delete  router
router.delete("/:id", (req, res) => {
  // get id from the forntend
  const { id } = req.params;

  //create query for deleting
  const query = `DELETE FROM ${process.env.T_NAME} WHERE id=?`;

  // send the query to the database
  connection.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Feature not found" });
    } else {
      return res.json({ message: "Feature deleted" });
    }
  });
}); // the end of the router

module.exports = router;
