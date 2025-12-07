const express=require("express");

const app=express();

app.use("/",(req,res,next)=>{
  // res.send("Handling / route");
   next(); // Remove or comment out if you want to send response
}
);

// /user has a chain of Middlewares=>request handlers
app.get("/user",
  (req,res,next)=>{
     console.log(("Handling /user Route"));
    next();
  },
  (req,res,next)=>{
    res.send(" 2nd Route handler")
    next();
  },
  (req,res,next)=>{
    res.send(" 3rd Route handler")
  }
)


app.listen(7777,()=>{
   console.log("Successfully Running on Port 7777");
})