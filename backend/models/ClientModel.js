const mongoose= require("mongoose")
const  clientSchema= mongoose.Schema({
name:{
    type:String
},
lastName:{
    type:String
},
email:{
    type:String
},
mobile:{
    type:Number
},
project:{
    type:String
},
})
const clientData = mongoose.model("clientData",clientSchema)
module.exports= clientData
