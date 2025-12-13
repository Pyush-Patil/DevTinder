const mongoose=require("mongoose");

const userschema= new mongoose.Schema({
    firstname:{
        type:String
    },
    Lastname:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    Age:{
        type:Number
    },
    Gender:{
        type:String
    }
})

// This User Model is like a Class and will contain instances of multiple users  
module.exports=mongoose.model("User",userschema);