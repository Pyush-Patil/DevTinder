const express=require("express");
const requestRouter=express.Router();
const { UserAuth } = require("../middlewares/auth");
const ConnectionRequest=require("../model/connectionrequest");
const User=require("../model/user")

requestRouter.post("/request/send/:status/:toUserid",UserAuth,async(req,res)=>{
   try{
       const user=req.user;
       const toUserid=req.params.toUserid;
       const fromUserid=user._id;
       const status=req.params.status;

      const AllowedStatus=["interested","ignored"];
      if(!AllowedStatus.includes(status))
      {
         throw new Error("Invalid Status")
      }

      const touser=await User.findById(toUserid);
      if(!touser)
      {
        return res.status(400).send({message:"User not found"})
      }

      const connectionRequest=new ConnectionRequest({
       fromUserid,
       toUserid,
       status
       })
       
      const existingconnectionrequest=await ConnectionRequest.findOne({
        $or:[
          {fromUserid,toUserid},
          {fromUserid:toUserid,touserid:fromUserid}
        ]
       })
       if(existingconnectionrequest)
       {
         return res.status(400).send({message:"Connection Request Already Exists"});
       }
       
       const data=await connectionRequest.save();
       if(status=="interested")
       {
       res.json({
         message:req.user.firstname + " is " + status + " in " + touser.firstname,
         data
       })
      }
      else
      {
        res.json({
         message:req.user.firstname + status + touser.firstname,
         data});
      }
      }
      catch(err)
      {
         res.status(400).send("Error : "+ err.message)
      }
})

requestRouter.post("/request/review/:status/:requestid",UserAuth,async(req,res)=>{
 try{
     const loggedInUser=req.user;
     const {status,requestid}=req.params;
     const AllowedStatus=["accepted","rejected"];
     if(!AllowedStatus.includes(status))
     {
        return res.status(400).json({message:"Status not valid"});
     }
     const connectionRequest= await ConnectionRequest.findOne({
          _id:requestid,
          status:"interested",
          toUserid:loggedInUser._id
     })
     if(!connectionRequest)
     {
        return res.status(400).json({message:"request not found"})
     }
     connectionRequest.status=status;
     const data=await connectionRequest.save()
     res.json({message:"Connection Request" + status,
         data
     })

 }
 catch(err)
 {
    res.status(400).send("Error : " + err.message);
 }
})



module.exports=requestRouter;
