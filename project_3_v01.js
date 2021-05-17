const mongoose = require("mongoose");

const option = {
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
mongoose.connect("mongodb://localhost:27017/Project_3", option).then(
    ()=>{ console.log("DB connected");},
    (err)=>{console.log(err);}
)