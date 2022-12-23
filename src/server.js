//import async errors
require("express-async-errors")

//import express
const express = require("express");
const app = express();
app.use(express.json());

//routes connection
const routes = require("./routes");
app.use(routes);

//migrations
const migrationsRun = require("./database/sqlite/migrations")
migrationsRun();

//AppError
const AppError = require("./utils/AppError")
app.use(( error, request, response, next) => {
  //if a instancia do erro for do "AppError" (erro do cliente)
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  //if o erro não for do cliente
  return response.status(500).json({
    status: "error",
    message: `"Internal server error."${error}`
  })

  console.error(error);

});

//listen on port
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));