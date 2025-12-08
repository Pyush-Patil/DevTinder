
const express=require("express");

const app=express();

app.use("/getuserdata",(req,res)=>{
  // try{
    //logic to call db and get the user data 
  throw new Error("Random error") // This code contains some error and  will throw along with some random code that will expose some of your data  
  res.send("user data sent");
  // }
  // catch(err)
  // {
  //   res.status(501).send("Some Error occured Contact support team")
  // }
})

// A way handle the error gracefully
app.use("/",(err,req,res,next)=>{
  if(err)
  {
  res.status(500).send("Something went wrong")
  }
})


app.listen(7777,()=>{
   console.log("Successfully Running on Port 7777");
})