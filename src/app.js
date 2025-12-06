const express=require("express");

const app=express();

// app.use("/",(req,res)=>{
//     res.send("Namaste Piyush")
// });

//This will one match to the GET APi call for /user
app.get("/user/:UserID/:NAme/:Password",(req,res)=>{
    console.log(req.params);

    res.send([
    {
    Firstname:"Piyush",
    lastname:"Patil",
    Age:21,
    },
    {
    Firstname:"John ",
    lastname:"Doe",
    Age:34
    }
])
}
) // Request Handlers

app.post("/user",(req,res)=>{

})

app.listen(7777,()=>{
    console.log("Server is Successfully running on Port 7777");   
    
});

// if you write a*b this means you can write anything between a and b into your url and still i will run 
//eg localhost:7777/aPIyUSHb

// + this plus indicates

///.*fly$/ this is regex which means your route mus end with fly 
