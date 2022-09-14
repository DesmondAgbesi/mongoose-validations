const router = require("express").Router;
const {register, login} = require("./auth.controller");

const authRouter = router();

authRouter.post("/register", register);
authRouter.post("/login", login);


module.exports = { authRouter};