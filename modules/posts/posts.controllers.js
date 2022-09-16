const Post = require("./post.model")
const {verify} = require("jsonwebtoken");
const usersModel = require("../users/users.model");

const verifyAuthor = async (req, res)=>{
  let post = await Post.findById(req.params.postId);
  if(post._id.toString() !==usersModel.req.id){
    return res.status(400).json({error: "You are not permitted to perform this operation"})
  }
}

exports.getAllPost =  async (req, res) =>{
  const post = await Post.find({});
  res.status(200).json({post})
};

exports.getAllPostsByUser = async (req, res) => {
  const posts = await Post.find({author: req.user.id});
  res.status(200).json({posts})
}

exports.createPost = async (req, res) =>{
  console.log(req.body)
  const{title, body, published} = req.body
  const post  = await Post.create({
    title,
    body,
    published,
    author: req.user.id,
  });

  res.status(201).json({post})
}

exports.getSinglePost = async (req, res) =>{
  // const postId = req.params.postId
  const { postId } = req.params;
  const post = await Post.findById(postId)
  res.status(200).json({ post })
}

exports.updatePost = async (req, res) => {
  const { postId } = req.params;
  // const post = await Post.findByIdAndUpdate(postId, {...req.body}, {new: true});
  //checks  
  await verifyAuthor();
  post = await Post.findByIdAndUpdate(postId, {...req.body}, {new:true});
  res.status(200).json({ post })
}

exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  await verifyAuthor();
  
  const post = await Post.findByIdAndDelete(postId)

  console.log(post);
  res.status(200).json({"msg":"post deleted successfully"});
}
