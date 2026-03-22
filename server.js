const express = require("express");
const cors = require("cors");
const { connection } = require("./database/database");
require("dotenv").config();
const createRequestTracker = require("./routers/create_request_tracker");
const deleteRequestTracker = require("./routers/delete_request_tracker");
const updateRequestTracker = require("./routers/update_request_tracker");
const viewRequestTracker = require("./routers/view_request_tracker");
const filterRequestTracker = require("./routers/update_by_status_request_tracker");
const filterRequestByStatus = require("./routers/filter_by_status_request_tracker");

// initialize  express constuctor/ create express object
const app = express();

// accept json data from the frontend
app.use(express.json());
// accept maltiform data from the frontend
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// configures cores
app.use(cors());
// connect to the database
connection.connect((err) => {
  if (!err) {
    console.log("Database is connected successfully");
  } else {
    console.log("An error occurs :" + err.message);
  }
});

// creating api end points
app.use("/api/features", createRequestTracker); // api endpoint for creating feature request
app.use("/api/features", deleteRequestTracker); //api endpoint for deleting feature request
app.use("/api/features", updateRequestTracker); // api endingpoint for update the feature request
app.use("/api/features", viewRequestTracker); //api endpoint for getting all features
app.use("/api/features", filterRequestTracker); // api for filter requests by status
app.use("/api/features", filterRequestByStatus); // api for firlter request based on status

// create server
app.listen(process.env.PORT, () => {
  console.log("Server start at the port:" + process.env.PORT);
});
