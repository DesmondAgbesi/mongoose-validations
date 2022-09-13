const express = require("express");
const postRouter =require("./modules/posts/posts.route");
const {dbConnect} = require("./config/dbConnect");
const { authRouter } = require("./modules/users/auth.route");

const app = express();
app.use(express.json())

app.use("/auth", authRouter)
app.use("/posts", postRouter)

async function start(){
  await dbConnect();

  app.listen(4000, ()=>{
    console.log("Server is running on http://localhost:4000")
  });
}

start();