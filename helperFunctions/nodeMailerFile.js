const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});


exports.sendMail = (mailOptions) => {
    
    // send mail with defined transport object
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            reject(error)
        } else {
            resolve(info.response)
        }
      });

    })
  
}