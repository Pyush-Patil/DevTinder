const express=require("express");

const app=express();

app.use("/test",(req,res)=>{
    res.send("Namaste from test");
})  // Request Handlers

app.use("/user",(req,res)=>{res.send("Hello from the users")}) // Request Handlers

app.use("/products",(req,res)=>{res.send("Hello from the product")}); // Request Handlers

app.listen(7777,()=>{
    console.log("Server is Successfully running on Port 7777");   
    
});

