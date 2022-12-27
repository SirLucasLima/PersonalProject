const { Router } = require("express");
const routes = Router();

//arquivo para agrupar todas as rotas da aplicação
const userRouter = require("./users.routes"); 
routes.use("/users", userRouter)
const notesRouter = require("./notes.routes"); 
routes.use("/notes", notesRouter)

module.exports = routes;

