const router = require("express").Router;
const {getAllPost, createPost, updatePost, deletePost, getSinglePost} = require("./posts.controllers");

const postRouter = router();

postRouter.route("/").get(getAllPost).post(createPost);
postRouter.route("/:postId").get(getSinglePost).patch(updatePost).delete(deletePost)

module.exports = postRouter;

