const { Router } = require("express")
const tagsRoutes = Router()

const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController()

const ensureAuthentication = require("../middleware/ensureAuthentication")
tagsRoutes.use("/", ensureAuthentication)

tagsRoutes.get("/", tagsController.index)

module.exports = tagsRoutes