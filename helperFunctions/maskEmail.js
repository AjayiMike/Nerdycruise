exports.maskEmail = (email) => {

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