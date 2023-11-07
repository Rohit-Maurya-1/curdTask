const mongoose = require("mongoose")
const connection = mongoose.connect('mongodb://0.0.0.0:27017/client').then((res)=>{
  console.log("connection successfully");
}).catch((err)=>{
  console.log("connection error");
})
module.exports=connection;