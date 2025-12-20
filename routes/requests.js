const express=require("express");
const requestRouter=express.Router();
const { UserAuth } = require("../src/middlewares/auth");

requestRouter.post("/sendConnectionrequest",UserAuth,async(req,res)=>{
   //Logic to send connection
  const user=req.user;
   res.send(user.firstname + "sent the connection request");
})

module.exports=requestRouter;
