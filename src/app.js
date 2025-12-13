
const express=require("express");

const connectDB=require("./config/database")

const app=express();

const User=require("./model/user");

app.use(express.json()); // express js middleware to get api data into json form

app.post("/signup", async (req,res)=>{
  
     
// creating a new user instance of the User Model    
    const user=new User(req.body);
    
  try{
    await user.save();
    res.send("User Added Successfully");
  }
  catch(err){
   res.status(400).send("Error Saving the User"+err.message)
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
