const { Router } = require("express");
const routes = Router();

//arquivo para agrupar todas as rotas da aplicação
const tagsRouter = require("./notes.routes"); 
const notesRouter = require("./tags.routes"); 
const userRouter = require("./users.routes"); 

routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter)
routes.use("/users", userRouter)

module.exports = routes;

