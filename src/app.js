
const express=require("express");

const connectDB=require("./config/database")

const app=express();

const User=require("./model/user");

app.use(express.json()); // express js middleware to get api data into json form

// POST /signup => This api will register the User into the Database
app.post("/signup", async (req,res)=>{      
// creating a new user instance of the User Model    
    const ALLOWED_SIGNUP=["firstname","Lastname","emailId","password"];
  try{
    const isallowed=Object.keys(req.body).every(k=>ALLOWED_SIGNUP.includes(k));
    if(!isallowed)
    {
      throw new Error("cannot add extra details")
    }
     const user=new User(req.body);
    await user.save();
    res.send("User Added Successfully");
  }
  catch(err){
   res.status(400).send("Error Saving the User"+err.message)
  }
})

// // GET-/user =>this api will give the specific user from the database
app.get("/user",async (req,res)=>{
  
  const useremail=req.body.emailId
try{
 const user= await User.find({emailId:useremail})
 if(user.length === 0)
 {
    res.status(400).send("User not found");
 }
 res.send(user);
}
catch(err)
{
  res.status(400).send("Something went wrong ");
}
})

// GET-/feed =>this api will give all the users from the database 
app.get("/feed",async (req,res)=>{
   try
   {
     const users=await User.find({});
     res.send(users);
   }
   catch(err){
      res.status(400).send("Something went wrong")
   }
})

// DELETE /user 
app.delete("/user",async(req,res)=>{
  const userid=req.body.userid;
   try{
  const user=await User.findByIdAndDelete(userid);
  res.send("User deleted successfully")
   }
    catch(err){
      res.status(400).send("Something went wrong")
   }
   
})

// UPDATE /user
app.patch("/user",async(req,res)=>{
  const userid=req.body.userid;
  const data=req.body;
 
  const ALLOWED_UPDATES=["password","Gender","skills","Age","userid","photourl","About"] 
  try
  {
      const isupdateallowed=Object.keys(data).every(k=>ALLOWED_UPDATES.includes(k));

      if(!isupdateallowed)
      {
        throw new Error("Update now allowed")
      }

      if(data?.skills,length>10)
      {
        throw new Error("Skills cant be more than 10")
      }

    const user=await User.findByIdAndUpdate(userid,data,{returnDocument:"after",runValidators:true,});
    console.log(user);
    
    res.send("User updated Successfully");
  }
  catch(err)
  {
    res.status(400).send("UPDATION FAILED " + err.message)
  }
})



connectDB().then(()=>{
    console.log("Database Connection Established");
    app.listen(7777,()=>{
   console.log("Successfully Running on Port 7777"); // Listening on the Server only when the database is connceted successfully
})
}).catch(()=>{
console.error("Database Connection Failed");
})
