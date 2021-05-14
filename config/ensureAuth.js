const jwt = require("jsonwebtoken");
const pool = require("../db/db")

const ensureAuth = (req, res, next) => {
    if(!req.headers['authorization']) return next()

    const token = req.headers['authorization'].split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err) return next()

        pool.connect(async (err, client, release) => {
            if(err) throw "error connecting to database"
            try {
                const data = await client.query("SELECT * FROM users WHERE id = $1", [payload.sub])
                if(data.rows.length === 0) 
                    return next()
                 req.user = data.rows[0]
                
                return next()
            } catch(err) {
               return next()
            } finally {
                release()
            }
            
        })
        
    }) 
}

module.exports = ensureAuth;