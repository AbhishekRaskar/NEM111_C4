const express = require("express")
const { postModel } = require("../Models/postModel")
const { auth } = require("../Middlewares/auth")

const postRouter = express.Router()
require("dotenv").config()

postRouter.post("/add", auth, async (req, res) => {
    console.log(req.body)
    try {
        const post = new postModel(req.body)
        await post.save()
        res.status(200).json({ msg: `A new post has been created by ${req.body.name}` })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

postRouter.get("/", auth, async (req, res) => {
    // console.log(req.body)
    const { userID } = req.body;
    const { device } = req.query
    let obj = {}
    if (userID) {
        obj.userID = userID
    }

    if (device) {
        obj.device = device
    }
    try {
        const posts = await postModel.find(obj)
        if (posts) {
            res.status(200).json({ msg: "Your Postes....", posts: posts })
        }
        else {
            res.status(400).json({ msg: "Posts Not Found" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

postRouter.patch("/update/:id", auth, async (req, res) => {
    const { id } = req.params
    console.log("BODY", req.body);
    const posts = await postModel.findOne({ _id: id })
    console.log("I'm POSTS", posts);
    try {
        if (req.body.userID !== posts.userID) {
            res.status(400).json({ msg: "You are Not Authorized..." })
        }
        else {
            await postModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).json({ msg: "Post Updated Successfully ....!" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})


postRouter.delete("/delete/:id", auth, async (req, res) => {
    const { id } = req.params
    console.log("BODY", req.body);
    const posts = await postModel.findOne({ _id: id })
    console.log("I'm POSTS", posts);
    try {
        if (req.body.userID !== posts.userID) {
            res.status(400).json({ msg: "You are Not Authorized..." })
        }
        else {
            await postModel.findByIdAndDelete({ _id: id }, req.body)
            res.status(200).json({ msg: "Post Deleted Successfully ....!" })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = {
    postRouter
}