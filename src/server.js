require("express-async-errors")
const express = require("express");

const app = express();
app.use(express.json());

const routes = require("./routes");
app.use(routes);

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


const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));