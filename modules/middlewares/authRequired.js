const jwt = require("jsonwebtoken");

exports.authRequired = (req, res, next)=>{
  const authorizaiton = req.headers.authorization;
  if(!authorizaiton) {
    return res.status(402).json({error: "Please login to use this platform"});
  }
  
  const token = authorization.split(" ")[1];
  if (!token){
    return res.status(402).json({error: "Please login"})
  }

  const user = jwt.verify(
    token,
    "fdc5fd1716e113dc02b7208739731a3b61c1d0f06a98e782c2a0f9376a274025",
    
  )

  req.user = user;
  
  next();
};