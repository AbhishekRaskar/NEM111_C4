const jwt = require("jsonwebtoken")
require("dotenv").config()




const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.secret)
            if (decoded) {
                console.log(decoded);
                req.body.userID = decoded.userID
                req.body.name = decoded.name
                next()
            }
            else {
                res.status(400).json({ msg: "Not Authorized..." })
            }
        } catch (error) {
            res.status(400).json({ error: error.message })

        }
    }
    else {
        res.status(400).json({ msg: "Please Login....!" })
    }
}


module.exports = {
    auth
}