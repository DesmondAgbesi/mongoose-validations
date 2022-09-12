const router = require("express").Router;
const {getAllPost, createPost} = require("./posts.controllers");

const postRouter = router();

postRouter.route("/").get(getAllPost).post(createPost);

module.exports = postRouter;

