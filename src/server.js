require("express-async-errors") //async-error needs to be imported first of all
const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")

const app = express()
app.use(express.json()) 
app.use(routes)
app.use((error, request, response, next) => {
  //if the error is caught by exception handling
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error) //print to debug error

  //if error is not caught by exception handling, it means an internal error
  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
}) 

const port = 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))



 
 