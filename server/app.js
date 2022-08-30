const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

// static middleware
// middleware
app.use(morgan("dev"));
// api/router
app.use("/api", require("./_api"));
//auth routes

// error handling
app.use((req, res, next) => {
  const error = Error('Page Not Found.');
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error.');
});

module.exports = app;

