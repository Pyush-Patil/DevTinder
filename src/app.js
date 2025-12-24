const express=require("express");
const connectDB=require("./config/database")
const app=express();
const cookieparser=require("cookie-parser")

app.use(express.json());
app.use(cookieparser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/requests");
const UserRouter=require("./routes/user")

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",UserRouter)

connectDB().then(()=>{
    console.log("Database Connection Established");
    app.listen(7777,()=>{
   console.log("Successfully Running on Port 7777"); // Listening on the Server only when the database is connceted successfully
})
}).catch(()=>{
}).catch((err)=>{
console.error("Database Connection Failed:", err && err.message ? err.message : err);
})
