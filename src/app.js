const express=require("express");

const app=express();

app.use("/user",[
  (req,res,next)=>{
  console.log("Handling Route User");
  next(); //This will take you to the 2nd request handler 
  // res.send("Response") // This will execute after the 2nd req handler func 
  // The Error Comes because youre trying to send the response again after a successfull response alr sent over there 
},
 (req,res,next)=>{
  console.log("Handling Route User 2");
  next();
  // res.send("2nd response");
},
(req,res,next)=>{
  console.log("Handling Route User 3");
  next();
   res.send("3rd response");
}
]
)
//app.use("/route",[[rh1,rh2],rh3,rh4]) valid syntax

app.listen(7777,()=>{
   console.log("Successfully Running on Port 7777");
})