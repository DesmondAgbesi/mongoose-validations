const User = require("./users.model");

exports.register = async (req, res) =>{
  const {email, password} = req.body;

  // checking for already existing email
  const emailExists = await User.findOne({email});
  if(emailExists) {
    return res.status(400).json({error: "Email already exists."});
  }

  //to create
  const user = await User.create({...req.body});

  res.status(201).json({ user });
};