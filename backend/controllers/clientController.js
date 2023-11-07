const ClientModel= require("../models/ClientModel")

module.exports.createClient = async (req, res, next) => {
  try {
    const {name,lastName,email,mobile,project}=req.body;
     if (!name || !lastName || !email ||!mobile||!project){
      return res.status(401).send({
        status: false,
        message: "plz fil all data",
        Response: {},
      });
    }
    const UserEmail = await ClientModel.findOne({email});
      if (UserEmail) {
        return res.status(400).send({
        status: false,
        message: "client Email already exit",
        Response:{},
      });
    }
  const RegisterData = await ClientModel.create({
    name,lastName,email,mobile,project
    });
    if (RegisterData){
      return res.status(200).send({
        status: true,
        message: "client add successfully",
        Response: RegisterData,
      });
    } else {
      return res.status(401).send({
        status: true,
        message: "user not add",
        Response: {},
      });
    }
    }
  catch (error){
    next(error);
  }
};
//=========================getData==============================================

module.exports.getClient = async (req, res, next) => {
    try {
      const getData = await ClientModel.find();
      if (!getData){
        return res.status(400).send({
          status: false,
          message: "not get data",
          Response: {},
        });
      }
      res.status(200).send({
        status: true,
        message: "get all data",
        Response:getData,
      });
    } catch (error){
      next(error);
    }
  };
  module.exports.UpdateClient = async (req, res,next) => {
    try {
    const _id = req.params.id;
    const {name,lastName,email,mobile,project}=req.body;
     const updateData = await ClientModel.findByIdAndUpdate(
      { _id },
      {
        $set:{
            name ,lastName,email,mobile,project
        },
      },
      {new:true}
    );
    if (updateData) {
        res.status(200).send({
            status: true,
            message: "user update successfully",
            Response: updateData,
          });
    }
   
  } catch (error) {
    next(error)
  }
  };
  module.exports.DeleteClient = async (req,res,next)=>{
    try {
      const _id = req.params.id;
      const deleteData = await ClientModel.findByIdAndDelete(_id);
      if (!deleteData){
        return res.status(400).send({
          status: false,
          message: "client not deleted",
          Response:{},
        });
      }
      res.status(200).send({
        status: true,
        message: "client deleted successfully",
        Response: deleteData,
      });
    } catch (error) {
        next(error)
    }
    };