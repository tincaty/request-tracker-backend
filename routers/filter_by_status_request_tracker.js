// implement firter feature by status 
const express = require("express");
const {connection }= require("../database/database");
require("dotenv").config();

// creating a routing object
const router = express.Router();

// implement the rooter  for searching features based on the status 
router.get("/status" ,(req,res)=>{
    // receive the status from the  frontend 
     const { status } = req.query;
 // validate status input  
  if (!status) {
    return res.status(400).json({
      message: "Status query parameter is required",
    });
  }
//create the database query command 
  const query = `SELECT * FROM ${process.env.T_NAME} WHERE status = ? ORDER BY created_at DESC`;
// send the  command query to the  database 
  connection.query(query, [status], (err, rows) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch features",
        error: err.message,
      });
    }

    // map database format with  frontend format
    const features = rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      priority: row.priority,
      status: row.status,
      createdAt: row.created_at,
    }));

    return res.status(200).json(features);
  });



}) // end of the router 

// export the router from server uses 
module.exports=router