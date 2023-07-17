const express = require("express")
const { userModel } = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()
require("dotenv").config()



// userRouter.get("/", async (req, res) => {
//     res.send("Abhi")
// })


userRouter.post("/register", async (req, res) => {
    const { password, email, name, gender } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new userModel({ ...req.body, password: hash })
            await user.save()
            res.status(200).json({ msg: "User has been Registered....!" })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


userRouter.post("/login", async (req, res) => {
    const { password, email } = req.body
    try {

        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id, name: user.name }, process.env.secret)
                    res.status(200).json({ msg: "Login Successful....!", token: token })
                }
                else {
                    res.status(400).json({ msg: "Wrong Credentials..." })
                }
            })
        }
        else {
            res.status(400).json({ msg: "User Not Found" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
module.exports = {
    userRouter
}