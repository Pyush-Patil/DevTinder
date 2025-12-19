const jwt=require("jsonwebtoken");
const User=require("../model/user")
const UserAuth= async (req,res,next)=>{
  //Writing Logic to Authenticate user
  try{
  const {token}=req.cookies
  if(!token)
  {
    throw new Error("Token not found!!!!!!!!!!!")
  }
  const decodedobj=await jwt.verify(token,"DEV@TINDER$2503");
  const {_id}=decodedobj;
   const user=await User.findById(_id);
   if(!user)
   {
    throw new Error("User Not found")
   }
   req.user=user;
   next();
  }
  catch(err)
  {
     res.status(400).send("ERROR : " + err.message)
  }
}


module.exports={UserAuth}