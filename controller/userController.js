


// 

exports.userDataController = (req, res) => {
    if(!req.user) return res.json({
        status: false,
        message: "unauthorized"
    })

    const userData = {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        avatar_url: req.user.avatar_url
    }

    res.json({
        status: true,
        userData
    })
    
}