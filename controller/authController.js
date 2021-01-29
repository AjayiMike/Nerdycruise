const pool = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {sendMail} = require("../helperFunctions/nodeMailerFile")
const {
  maskEmail,
  signToken,
  generateID,
  generateRandPassword} = require("../helperFunctions/utils")
const {OAuth2Client} = require("google-auth-library")
const {randomBytes} = require("crypto")


googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)


// global variables here
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernamePattern = /^[a-zA-Z0-9]+(?:[_-][a-zA-Z0-9]+)*$/;

exports.registerController = async (req, res) => {

  let {email, username, password} = req.body;

  email = email.toLowerCase();
  

  if(!(username.length >= 3 && usernamePattern.test(username) ) || password.length < 6 || !emailPattern.test(email))
    return res.json({
      status: "false",
      message: "unable to register"
    })

    // check email existence

    pool.connect((err, client, release) => {
      if (err) throw "something went wrong"

      client.query("SELECT id from users WHERE email = $1", [email])
        .then(data => {
          if(data.rows.length > 0) 
            throw "an account with this email address already exist"
          
          

            bcrypt.hash(password, 10, (err, hash) => {
              if(err)  {
                return res.json({
                  status: false,
                  message: "something went wrong"
                })
              }
          
              // convert the username to lowercase
              username = username.toLowerCase()
          
              const userDetails = {
                email,
                username,
                password_hash: hash
              }
          
              const usernameToken = jwt.sign({username}, process.env.USERNAME_SECRET, {expiresIn: "1h"})
              const userDetialsToken = jwt.sign(userDetails, process.env.USER_DETAILS_SECRET, {expiresIn: "1h"})
              const activationLink = `${process.env.CLIENT_URL}/user/account/activation/${userDetialsToken}/${usernameToken}`
              


              
              // mail activation link to user
          
              const activationMailOptions = {
                from: `Nerdycruise <${process.env.EMAIL}>`,
                to: email,
                subject: "Account activation",
                html: `
                <h1>CLICK ON THE BUTTON BELOW TO ACTIVATE YOUR ACCOUNT</h1>
                <a style = "background-color:green; text-decoration:none; padding:5px; color:white;" href = ${activationLink}>activate</a>
                <p>or copy the link below into the browser to activate your account</p>
                <p>${activationLink}</p>
                `
              };
              
            
              sendMail(activationMailOptions)
                .then(successResponse => {
                  res.json({
                    status: true,
                    message: "activation link sent"
                  })
                })
                .catch(err => {
                  console.log(err)
                  return res.json({
                    status: false,
                    message: "something went wrong"
                  })
                })
            
          
            
            });




        })
        .catch(err => {
          return res.json({
            status: false,
            message: err
          })
        })
        .finally(() =>{
          release()
        })
    })
    

  

   
}


exports.activationController = (req, res) => {

  jwt.verify(req.body.token, process.env.USER_DETAILS_SECRET, (err, data) => {
    if(err)
      return res.json({
        status: false,
        message: "activation link expired"
      })

    const {email, username, password_hash} = data;

    // generate a random string to be used as id
    const id = generateID()

    // generate unique default avatar based on the id
    const avatar_url = `https://robohash.org/${id}?set=set3`
    
    pool.connect(async (err, client, release) => {
      if(err)
        return res.json({
          status: false,
          message: "something went wrong"
        })

        try {
          client.query("INSERT INTO users (id, username, email, password_hash, avatar_url) VALUES($1, $2, $3, $4)", [id, username, email, password_hash, avatar_url])
            .then(resp => {
              res.json({
                status: true,
                message: "success"
              })
            })
            .catch(err => {
              res.json({
                status: false,
                message: "somethng went wrong"
              })
            })
        }
        catch(err) {
            res.json({
              status: false,
              message: "somethng went wrong"
            })
        }
        finally {
          release()
        }
    })
    
  })
  
}


exports.loginController = (req, res) => {

  const {usernameOrEmail, password} = req.body;

  // dont bother checking the db if the data recieved does not match username or email
        
        if(!usernamePattern.test(usernameOrEmail) && !emailPattern.test(usernameOrEmail)) {
          return res.json({
            status: false,
            message: `something went wrong`
          });
      }
      
      // this is just to be able to customize the error message depending on the credentials user is trying to sign in with
      dataSubmitted = emailPattern.test(usernameOrEmail) ? "email" : "username"

      pool.connect(async (err, client, release) => {
          if(err) throw "something went wrong";
          try {
              const data = await client.query("SELECT id, password_hash FROM users WHERE username = $1 OR email = $1", [usernameOrEmail])

              if(data.rows.length === 0) 
                  return res.json({
                    status: false,
                    message: `incorrect ${dataSubmitted} or password`
                  });
              
                  
              bcrypt.compare(password, data.rows[0].password_hash, (err, isMatch) => {

                
                  if(err) 
                  return res.json({
                    status: false,
                    message: `something went wrong`
                  });


                  if(!isMatch) 
                  return res.json({
                    status: false,
                    message: `incorrect ${dataSubmitted} or password`
                  });


                  const token = signToken(data.rows[0].id)
                  res.json({
                    status: true,
                    token: token
                  });
              }) 
          } catch(err) {

              res.json({
                status: false,
                message: `something went wrong`

              });
          } finally {
              release()
          }
          
      })

}


exports.googleAuthController = (req, res) => {
  
  googleClient.verifyIdToken({idToken: req.body.tokenId, audience: process.env.GOOGLE_CLIENT_ID}).then(response => {
    
    if(!response.payload.email_verified) return res.json({
      status: false,
      message: "email not verified"
    })

    let {email, name} = response.payload;

    pool.connect(async (err, client, release) => {

      if(err) {
        return res.status(400).json("something went wrong")
      }

      try {
        const data = await client.query("SELECT id from users WHERE email = $1", [email])
        if(data.rows.length > 0) {
          // user exists, create token and send
          const token = signToken(data.rows[0].id)
          return res.json({
            status: true,
            token: token
          });
        }

        // create user in the database

        name = name.split(' ')
        const username = `${name[0]}_${name[1].charAt(0)}${Math.ceil(Math.random() * 10000)}`.toLowerCase()

        // generate a random string to be used as id
        const id = generateID()

        // generate unique default avatar based on the id
        const avatar_url = `https://robohash.org/${id}?set=set3`

        // generate a random password
        const password = generateRandPassword()

        bcrypt.hash(password, 10, (err, hash) => {
          if(err)  
            return res.json({
              status: false,
              message: "something went wrong"
            })
          
            client.query("INSERT INTO users (id, username, email, password_hash, avatar_url) VALUES($1, $2, $3, $4, $5)", [id, username, email, hash, avatar_url])
            .then(resp => {
              const token = signToken(id)
              res.json({
                status: true,
                token: token
              });
            })
            .catch(err => {
              res.json({
                status: false,
                message: "somethng went wrong"
              })
            })
        })
      } catch(err) {
          console.log(err)
      } finally {
          release()
      }
    })
  })
}





exports.forgotPasswordController = (req, res) => {

  
  
  if(!usernamePattern.test(req.body.usernameOrEmail) && !emailPattern.test(req.body.usernameOrEmail))
    return res,json({status: false, message: "something went wrong"})

  dataSubmitted = emailPattern.test(req.body.usernameOrEmail) ? "email address" : "username"
  let customeMessage;

  // if(emailPattern.test(req.body.usernameOrEmail)) {
    pool.connect(async (err, client, release) => {
      if(err)
        return res.json({
          status: false,
          message: "something went wrong"
        })
      try {
          const data = await client.query("SELECT id, email FROM users WHERE email = $1 OR username = $1", [req.body.usernameOrEmail])
          if(data.rows.length === 0)
            return res.json({
              status: false,
              message: `no user found with this ${dataSubmitted}`
            })
              
          const idToken = jwt.sign({id: data.rows[0].id}, process.env.ID_SECRET, {expiresIn: "1h"})
          const passwordResetLink = `${process.env.CLIENT_URL}/user/account/reset-password/${idToken}`
              
          if(dataSubmitted === "username") {
            // mask email address
            const maskedEmail = maskEmail(data.rows[0].email)
            customeMessage = `a password reset link has been sent to your email address ${maskedEmail}`
          } else {
            customeMessage = "a password reset link has been sent to your email address"
          }

          const resetPasswordMailOptions = {
            from: `Nerdycruise <${process.env.EMAIL}>`,
            to: data.rows[0].email,
            subject: "Password reset link",
            html: `
            <h1>you are recieving this mail because you request to reset your password</h1>
            <p>click the button below to reset your password</p>
            <a style = "background-color:green; text-decoration:none; padding:5px; color:white;" href = ${passwordResetLink}>activate</a>
            <p>or copy the link below into the browser to reset your password</p>
            <p>${passwordResetLink}</p>
            `
          };

              

              
          sendMail(resetPasswordMailOptions)
          .then(response=> {

            res.json({
              status: true,
              message: customeMessage
            })

          }).catch(err => {

            return res.json({
              status: false,
              message: "something went wrong"
            })

          })
          
      } catch(err) {
          
          return res.json({
            status: false,
            message: "something went wrong"
          })

      } finally {
        release()
      }
      
    })


}


exports.verifyResetPasswordTokenController = (req, res) => {
  jwt.verify(req.body.idToken, process.env.ID_SECRET, (err, data) => {
    if(err) {
      return res.json({
        status: false,
        message: "expired token"
      })
    }
      

      

      res.json({
        status: true,
        message: data.id
      })
      
      
  })
}


exports.resetPasswordController = (req, res) => {

  let {id, password} = req.body;

  
  if(!id || !(password.length >= 6))
    return res.json({
      status: false,
      message: "cannot update password!"
    })

  bcrypt.hash(password, 10, (err, hash) => {
    if(err) 
      return res.json({
        status: false,
        message: "something went wrong!"
      })

      pool.connect((err, client, release) => {
        if(err)
          res.json({
            status: false,
            message: "something went wrong!"
          })

        client.query("UPDATE users SET password_hash = $1 WHERE id = $2", [hash, id])
          .then(resp => {
            res.json({
              status: true,
              message: "success"
            })
          })
          .catch(err => {
            res.json({
              status: false,
              message: "something went wrong"
            })
          })
          .finally(() => {
            release()
          })
      })
  })
}