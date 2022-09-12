const express = require("express");
const postRouter =require("./modules/posts.route");
const {dbConnect} = require("./config/dbConnect")

const app = express();
app.use(express.json())

app.use("/posts", postRouter)

async function start(){
  await dbConnect();

  app.listen(4000, ()=>{
    console.log("Server is running on http://localhost:4000")
  });
}

start();