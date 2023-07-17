const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./Routes/userRoute")
const { postRouter } = require("./Routes/postRoute")

const cors = require("cors")
require("dotenv").config()


const app = express()


app.use(express.json())
app.use("/user", userRouter)
app.use("/post", postRouter)
app.use(cors())

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`Server is running at port ${process.env.port}`);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error.message)
    }
})