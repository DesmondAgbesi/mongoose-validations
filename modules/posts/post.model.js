const {Schema, model} = require("mongoose");

const postSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  published: {
    type:Boolean,
    default: false,
  },
  
},
{
  timestamp: true,
})

module.exports = model("Post", postSchema);