const jwt = require("jsonwebtoken")
const {randomBytes} = require("crypto")



const maskEmail = (email) => {

    const emailParts = email.split("@")

    if(emailParts[0].length < 2)
        return email;

    if(emailParts[0].length === 2)
        return `*${email.substring(1, email.length)}`


    const charsToMask = emailParts[0].substring(1, emailParts[0].length-1)
    let asterisks = ""
    for(let i = 0; i < charsToMask.length; i++) {
        asterisks += "*"
    }

    return `${emailParts[0].charAt(0)}${asterisks}${emailParts[0].charAt(emailParts[0].length-1)}@${emailParts[1]}`
        
    
}


const signToken = (id) => {
  return  jwt.sign({
        iss: "Nerdycruise",
        sub: id
    }, process.env.ACCESS_TOKEN_SECRET)
}

const generateID = () => {
    return Math.random().toString(36).slice(2) + randomBytes(8).toString('hex') + new Date().getTime();
}

const generateRandPassword = () => {
    return randomBytes(25).toString('hex');
}


module.exports = {
    maskEmail,
    signToken,
    generateID,
    generateRandPassword
};