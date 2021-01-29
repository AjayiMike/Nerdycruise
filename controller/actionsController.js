const pool = require("../db/db");

exports.checkUsernameExistenceController = (req, res) => {
    pool.connect(async (err, client, release) => {
        if(err) throw "error connecting to database"
        try {
            const data = await client.query("SELECT username FROM users WHERE username = $1", [req.body.username.toLowerCase()])
            if(data.rows.length > 0) {
                res.json({
                    status: false,
                    message: "username already taken"
                })
            } else {
                res.json({
                    status: true,
                    message: "username available"
                })
            }
        } catch(err) {
            res.json({
                status: false,
                message: err
            })
        } finally {
            release()
        }
        
    })
}