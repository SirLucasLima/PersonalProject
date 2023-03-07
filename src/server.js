require("express-async-errors") //async-error needs to be imported first of all
const AppError = require("./utils/AppError")
const express = require("express")
const routes = require("./routes")
const database = require("./database/sqlite")
const { uploadsFolder } = require("./configs/upload")

const app = express()
const port = 3000 

app.use(express.json()) 
app.use("/files", express.static(uploadsFolder)) //to access img files
app.use(routes) //to use routes
database() //to create db
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

app.listen(port, () => console.log(`Server is running on port ${port}`))



 
 