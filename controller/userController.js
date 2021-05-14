
const cloudinary = require("../config/cloudinary")

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

exports.profilePicUploadController = async (req, res) => {
    try {
        cloudinary.uploader.upload(req.body.imageSrc, {upload_preset: "profile_pictures"})
        .then(data => {
            console.log(data)

            res.json({
                status: true,
            })
        }).catch(err => {
            console.log("cloudinary err: ", err)
        })
        
        
    } catch(err) {
        console.log(err)
        res.json({
            status: false,
        })
    }
    
}