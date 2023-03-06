const { Router } = require("express")
const usersRoutes = Router()

const UsersController = require("../controllers/UsersController")
const ensureAuthentication = require("../middleware/ensureAuthentication")
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthentication, usersController.update)

module.exports = usersRoutes