const Router = require("express").Router()
const {userDataController, profilePicUploadController} = require("../controller/userController")
const ensureAuth = require("../config/ensureAuth")





Router.get("/", ensureAuth, userDataController)
Router.post("/profile-pic-upload", profilePicUploadController)

module.exports = Router