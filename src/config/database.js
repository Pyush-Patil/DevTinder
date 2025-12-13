const mongoose=require("mongoose");

async function connectDB(params) {
    await mongoose.connect("mongodb+srv://piyush_25:PiYuSh2503@cluster0.1twztdg.mongodb.net/devTinder");
}

module.exports=connectDB;

// connectDB().then(()=>{
//     console.log("Database Connection Established");
    
// }).catch(()=>{
// console.error("Database Connection Failed");

// })
//  Connecting the database in the our main app.js file because we want our database to connect first if conncetion is successfull then we will listening the request on the server 

