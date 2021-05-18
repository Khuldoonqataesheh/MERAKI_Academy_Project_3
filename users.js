const mongoose =require("mongoose");

const users  = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String},
    age: { type: Number },
    country: { type: String },
    email:{type: String},
    password: { type: String }
  });
  const articles   = new mongoose.Schema({
    title: { type: String},
    description: { type: String},
    author: {type:mongoose.Schema.ObjectId,ref:"User" },
    comments:[{type:mongoose.Schema.ObjectId}]
  });

  const comments   = new mongoose.Schema({
    comment: { type: String},
    commenter: {type:mongoose.Schema.ObjectId,ref:"User" },
  });
   

  const Users = mongoose.model("User", users);
  const Articles = mongoose.model("Article", articles);
  const Comments = mongoose.model("Comment", comments);
  module.exports.Users = Users;
  module.exports.Articles = Articles;
  module.exports.Comments = Comments;