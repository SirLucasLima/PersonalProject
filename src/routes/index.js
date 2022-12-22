const { Router } = require("express");
const routes = Router();

//arquivo para agrupar todas as rotas da aplicação
const userRoutes = require("./users.routes"); 
routes.use("/users", userRoutes)

module.exports = routes;

