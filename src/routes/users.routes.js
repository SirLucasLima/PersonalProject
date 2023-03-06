const { Router } = require("express")
const usersRoutes = Router()

const multer = require("multer")
const { multerConfig } = require("../configs/upload")
const upload = multer(multerConfig)

const UsersController = require("../controllers/UsersController")
const usersController = new UsersController()

const ensureAuthentication = require("../middleware/ensureAuthentication")

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthentication, usersController.update)
usersRoutes.patch("/avatar", ensureAuthentication, upload.single("avatar"), (request, response) => {
  console.log(request.file.filename)
  response.json()
})

module.exports = usersRoutes