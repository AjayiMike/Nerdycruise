const router = require("express").Router()
const {
    registerController,
    loginController,
    googleAuthController,
    activationController,
    forgotPasswordController,
    verifyResetPasswordTokenController,
    resetPasswordController
} = require("../controller/authController");



router.post("/register", registerController)

router.post("/account-activation", activationController)

router.post("/login", loginController)

router.post("/googleauth", googleAuthController)

router.post("/forgot-password", forgotPasswordController)

router.post("/verify-reset-password-token", verifyResetPasswordTokenController)

router.put("/reset-password", resetPasswordController)

    

module.exports = router;