//import async errors
require("express-async-errors")

//import express
const express = require("express");
const app = express();
app.use(express.json());

//database
const db = require("./database/sqlite")
db();

//routes connection
const routes = require("./routes");
app.use(routes);

//AppError
const AppError = require("./utils/AppError")
app.use(( error, request, response, next ) => {
  if( error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
      status: "error"
    })
  }
  console.error(error);

  return response.status(500).json({
    message: "Server internal error",
    status: "error"
  })
})


//listen on port
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));