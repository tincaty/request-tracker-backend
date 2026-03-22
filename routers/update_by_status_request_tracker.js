// implement router for update request based on the status
const express = require("express");
const {connection }= require("../database/database");
require("dotenv").config();

// creating a routing object
const router = express.Router();

// Update feature request by status
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) return res.status(400).json({ message: "Status is required" });

  const query = `UPDATE ${process.env.T_NAME} SET status=? WHERE id=?`;
  connection.query(query, [status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Feature not found" });
    } else {
      return res.json({ message: "Status updated successfully" });
    }
  });
});// end of the router 

// export the modelu

module.exports=router 

