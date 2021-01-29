const jwt = require("jsonwebtoken")

exports.signToken = (id) => {
    jwt.sign({
        iss: "Nerdycruise",
        SUB: id
    }, process.env.ACCESS_TOKEN_SECRET)
}