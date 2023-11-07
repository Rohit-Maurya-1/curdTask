const express = require("express")
require("./conn/connection")
const error = require("./middleware/errorHandlerMiddleware");
const cors= require("cors")
const app = express()
const PORT= process.env.PORT||8000
const router= require("./routes/clientRoutes")
app.get("/",(req,res)=>{
 req.send("rohit")
})

//===middleware========
app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cors())
app.use(error)
app.use(router)

app.listen( PORT,()=>{
  console.log(`running port no ${PORT}`);
})