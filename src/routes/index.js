const { Router } = require("express");
const routes = Router();

//arquivo para agrupar todas as rotas da aplicação
const userRouter = require("./users.routes"); 
const notesRouter = require("./tags.routes"); 
const tagsRouter = require("./notes.routes"); 

routes.use("/users", userRouter)
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter)

module.exports = routes;

