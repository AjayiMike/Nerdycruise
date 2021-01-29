const Router = require("express").Router()
const {userDataController} = require("../controller/userController")
const ensureAuth = require("../config/ensureAuth")




Router.get("/", ensureAuth, userDataController)

module.exports = Router