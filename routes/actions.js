const router = require("express").Router();
const {checkUsernameExistenceController} = require("../controller/actionsController")

router.post("/checkUsernameExistence", checkUsernameExistenceController)


module.exports = router;