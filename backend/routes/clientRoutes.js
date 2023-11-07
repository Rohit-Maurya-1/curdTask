const clientController= require("../controllers/clientController")
const express = require("express")
const router= express()
router.post("/createClient",clientController.createClient)
router.get("/getClient",clientController.getClient)
router.put("/updateClient/:id",clientController.UpdateClient)
router.delete("/deleteClient/:id",clientController.DeleteClient)
module.exports= router