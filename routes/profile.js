const express=require("express");
const profileRouter=express.Router();
const {UserAuth}=require("../src/middlewares/auth")
const {validateEditPofiledata,validatenewpassword}=require("../src/utils/validations")
const bcrypt=require("bcrypt");
const User=require("../src/model/user")


profileRouter.get("/profile",UserAuth,async(req,res)=>{
  try{
    const user=req.user;
   res.send(user)
  }
  catch(err)
  {
       res.status(400).send("Error : "+ err.message)
  }


})

profileRouter.get("/profile/view",UserAuth,(req,res)=>{
       try
       {
        const user=req.user;
        res.send(user)
       }
       catch(err)
       {
        res.status(400).send("ERROR : " + err.message)
       }
})

profileRouter.patch("/profile/edit",UserAuth,async(req,res)=>{
  try{
        if(!validateEditPofiledata(req))
        {
          throw new Error("Update is now Allowed")
        }
        const loggedInUser=req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
        await loggedInUser.save();
        res.send(`${loggedInUser.firstname},Profile Updated successfully`);
      }
      catch(err)
      {
        res.status(400).send("Error : " + err.message)
      }
}
)

profileRouter.patch("/profile/password",UserAuth,async(req,res)=>{
      try
      {
        const {password}=req.body;
        if(!password)
        {
          throw new Error("password required")
        }
        const user=req.user;
        const  ispasswordstrong= validatenewpassword(password);
        if(!ispasswordstrong)
        { 
           throw new Error("Enter the strong password ") 
        }
         const passwordhash=await bcrypt.hash(password,10);
          await User.findByIdAndUpdate(user._id,{password:passwordhash},{runValidators:true});
        
        res.send("password Updated successfully");      
      }
      catch(err)
      { 
          res.status(400).send("Error : " + err.message)
      }
    
})

module.exports=profileRouter