const User = require("./users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken  = (user) =>{
  const token = jwt.sign(
    {id: user._id, email:user.email}, 
    "fdc5fd1716e113dc02b7208739731a3b61c1d0f06a98e782c2a0f9376a274025",
    {
      expiresIn: "1h",
    })

    return {
      token,
      user,
    };
}

exports.register = async (req, res) =>{
  const {email, password} = req.body;

  // checking for already existing email
  const emailExists = await User.findOne({email});
  if(emailExists) {
    return res.status(400).json({error: "Email already exists."});
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  //to create
  const user = await User.create({...req.body, password: hashedPassword});

  //generate token
  const token = generateToken(user);
  res.status(201).json({ token });


};

exports.login = async (req, res)=>{
  const {email, password} = req.body;
  let user = await User.findOne({ email });

  if(!user){
    return res.status(400).json({"msg" : "Invalid credentials"})
  }
  
  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
   return res.status(400).json({"msg": "Invalid credentials"})
  }

   //generate token
  //  const token = jwt.sign(
  //   {id: user._id, email:user.email}, 
  //   "fdc5fd1716e113dc02b7208739731a3b61c1d0f06a98e782c2a0f9376a274025",
  //   {
  //     expiresIn: "1h",
  //   })

  //   const returnUser = {
  //     token,
  //     user,
  //   };



  const token = generateToken(user)
  res.status(200).json({ token });
}