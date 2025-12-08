const express=require("express");

const app=express();

// Actual Use Case of Middleware 

//Handling Auth Middleware for All GET POST PUT DELETE 
// /admin will automatically authorize admin everytime when you try to do something as an admin

const {adminauth,UserAuth}=require("./middlewares/auth")

app.use("/admin",adminauth);

app.get("/user",UserAuth,(req,res)=>{
    res.send("Got the User")
})

app.post("/user/login",(req,res)=>{
  //Logic to make the user login into your system
  res.send("User Logged in Successfully");
})
 
app.get("/admin/getAlldata",(req,res)=>{
  //logic to send data
  res.send("Sent All data")
});

app.get("/admin/deleteuser",(req,res)=>{
     //logic to delete user
     res.send("Deleted User");
});




app.listen(7777,()=>{
   console.log("Successfully Running on Port 7777");
})