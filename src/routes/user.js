const express=require("express");
const UserRouter=express.Router();
const {UserAuth}=require("../middlewares/auth");
const ConnectionRequest=require("../model/connectionrequest")
const User=require("../model/user")

UserRouter.get("/user/request/recieved",UserAuth,async (req,res)=>{
      try{
      const loggedInUser=req.user;
      const requestrecieved=await ConnectionRequest.find({
            toUserid:loggedInUser._id,
            status:"interested"
      }).populate("fromUserid",["firstname","lastname" ,"About" ,"Age","Gender",'skills']);
      res.json({message:"Data fetched Successfuly",
            data:requestrecieved
      });
     }
     catch(err)
     {
      res.status(400).send("Error : " + err.message);
     }
})

UserRouter.get("/user/connections",UserAuth,async (req,res)=>{
      try
      {
           const loggedInUser=req.user;
           const Connections=await ConnectionRequest.find({
            $or: [
                   {toUserid: loggedInUser._id , status:"accepted"},
                  {fromUserid:loggedInUser._id,status:"accepted"}
                  ]
           }).populate("fromUserid",["firstname","lastname","skills","Age","Gender"])
             .populate("toUserid",["firstname","lastname","skills","Age","Gender"])
           const data=Connections.map((row)=>{
               if(row.fromUserid._id.toString()===loggedInUser._id.toString())
               {
                  return row.toUserid
               }
               return row.fromUserid
           });
           res.json({data:data});
      }
      catch(err)
      {
            res.status(400).send("ERROR : " + err.message)
      }

})

UserRouter.get("/user/feed",UserAuth,async(req,res)=>{
      try{
      const loggedInUser=req.user;
      const page=parseInt(req.query.page) || 1;
      let limit=parseInt(req.query.limit) || 10;
      if(limit>50)
      {
          limit=50;
      }
      const skip=(page-1)*limit;
      const connectionrequest=await ConnectionRequest.find({
            $or:[
                  {fromUserid:loggedInUser._id},
                  {toUserid:loggedInUser._id}
            ]
      }).select("fromUserid toUserid");
      
      const hidefromusers=new Set();
      connectionrequest.forEach((req)=>{
            hidefromusers.add(req.fromUserid.toString());                                                                                                                                                                                                                                                              
            hidefromusers.add(req.toUserid.toString());
      })

      const users=await User.find({
            $and: [
            {_id: {$nin:Array.from(hidefromusers)}},
            {_id :{$ne:loggedInUser._id}}
            ]
      }).select("firstname lastname About  Age Gender skills")
        .skip(skip).limit(limit);
       res.json({data:users});
      }
      catch(err)
      {
            res.status(400).send("ERROR : " + err.message)
      }
})

module.exports=UserRouter;