const { Router } = require("express")
const usersRoutes = Router()

const UsersController = require("../controllers/UsersController")
const usersController = new UsersController()

const ensureAuthentication = require("../middleware/ensureAuthentication")

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthentication, usersController.update)

module.exports = usersRoutes