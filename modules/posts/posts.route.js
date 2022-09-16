const router = require("express").Router;
const { authRequired } = require("../middlewares/authRequired");
const {getAllPost, createPost, updatePost, deletePost, getSinglePost} = require("./posts.controllers");

const postRouter = router();

postRouter.route("/").all(authRequired).get(getAllPost).post(createPost);
postRouter.route("/:postId").all(authRequired).get(getSinglePost).patch(updatePost).delete(deletePost)

module.exports = postRouter;

