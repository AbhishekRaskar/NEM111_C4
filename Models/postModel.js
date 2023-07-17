const mongoose = require("mongoose")


const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: { type: String, enum: ["PC", "TABLET", "MOBILE"], required: true },
    userID: String,
    name: String

}, {
    versionKey: false
})

const postModel = mongoose.model("post", postSchema)


module.exports = {
    postModel
}