const { Router } = require("express");
const UsersController = require("../controller/UsersController");
const usersController = new UsersController;
const userRoutes = Router();

userRoutes.post("/", usersController.create);

module.exports = userRoutes;
 