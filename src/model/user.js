const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")

const userschema= new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
    },
    lastname:{
        type:String,
        required:true,
        lowercase:true
    },
    emailId:{
      type:String,
      required:true,
      unique:true,
      trim:true,
      lowercase:true,
      validate(value)
      {
        if(!validator.isEmail(value))
        {
            throw new Error("Indavlid EmailID");
        }
      }
    },
    password:{
        type:String,
         validate(value)
        {
        if(!validator.isStrongPassword(value))
        {
            throw new Error("Enter a strong password");
        }
        }
    },
    Age:{
        type:Number,
        min:18
    },
    Gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value))
            {
                throw new Error("GEnder is not valid");
            }
        } // TO RUN THIS VALIDATE FUNCTION FOR PATCH ALSO MAKE RUNVALIDATORS TRUE IN API
    },
    skills:{
       type:[String] 
    },
    About:{
        type:String,
        default:"This is a default anout of this user"
    },
    photourl:{
        type:String,
        default:"https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740&q=80",
        validate(value)
        {
        if(!validator.isURL(value))
        {
            throw new Error("Indavlid EmailID");
        }
        }
    }
},{timestamps:true})

userschema.methods.getJWT=async function ()
{
      const user=this;
     const token= await jwt.sign({_id:user._id},"DEV@TINDER$2503",{expiresIn:"1d"});

      return token;
}

userschema.methods.validatepassword=async function (Inputpasswordbyuser) {
     const user=this;
     const passwordhash=user.password; //actual password present in database  
     const isvalidpassword=await bcrypt.compare(Inputpasswordbyuser,passwordhash)
     return isvalidpassword;
}
// This User Model is like a Class and will contain instances of multiple users  
module.exports=mongoose.model("User",userschema);