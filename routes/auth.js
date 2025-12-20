const express=require("express")
const authRouter=express.Router();
const {validatingSignupdata}=require("../src/utils/validations")
const bcrypt=require("bcrypt")
const User=require("../src/model/user");

authRouter.post("/signup", async (req,res)=>{ 
  console.log(req.body);
      
  try{
    // validation of Signup data
    validatingSignupdata(req);
   const {firstname,lastname,emailId,password}=req.body;
   //encrypt passwords
     const passwordhash=await bcrypt.hash(password,10);
   // creating a new instance of User Model
     const user=new User({
       firstname,
       lastname,
       emailId,
       password:passwordhash
     });
    await user.save();
    res.send("User Added Successfully");
  }
  catch(err){
   res.status(400).send("Error Saving the User : "+err.message)
  }
})

authRouter.post("/login",async(req,res)=>{
    try{
      const {emailId,password}=req.body;

      const user =await User.findOne({emailId:emailId});

      if(!user)
      {
        throw new Error("Email not found ");
      }
      const isvalidpassword=user.validatepassword(password);
      if(isvalidpassword)
      {
        const token=await user.getJWT();
         res.cookie("token",token);
        res.send("Login Successfull");
      }
      else
      {
        throw new Error("Invalid Password");
      }

    }catch(err)
    {
       res.status(400).send("Error Logging in : " + err.message);
    }
})

module.exports=authRouter

