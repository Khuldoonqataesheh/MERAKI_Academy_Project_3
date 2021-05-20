const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const users = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String },
  password: { type: String },
});
const articles = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],
  role:{type:mongoose.Schema.ObjectId,ref:"Role"}
});

const comments = new mongoose.Schema({
  comment: { type: String },
  commenter: { type: mongoose.Schema.ObjectId, ref: "User" },
});

users.pre("save", async function () {
  this.email = this.email.toLowerCase();
  const salt = 10;
  this.password = await bcrypt.hash(this.password, salt);
});

const role = new mongoose.Schema({
  role: { type: String },
  permissions: [{ type: String}],
});



const Users = mongoose.model("User", users);
const Articles = mongoose.model("Article", articles);
const Comments = mongoose.model("Comment", comments);
const Roles = mongoose.model("Role", role);
module.exports.Users = Users;
module.exports.Articles = Articles;
module.exports.Comments = Comments;
