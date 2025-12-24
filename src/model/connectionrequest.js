const mongoose=require("mongoose")

const connectionRequestSchema=new mongoose.Schema({
    fromUserid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User" // This will refer to User Model
    },
    toUserid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        enum:{
            values:["accepted","rejected","ignored","interested"],
            message:`{values} is incorrect status`
        },
        required:true
    }
   },{timestamps:true}
);

//ConnectionRequest.find({fromUserid:43714719349gfd,toUserid:d239h321jsa5203});

connectionRequestSchema.index({fromUserid:1,toUserid:1});

// connectionRequestSchema.pre("save", function(next){
//     const request=this;
//     if(request.fromUserid.equals(request.toUserid))
//     {
//         throw new Error("Cannot send request to yourself");
//     }
//     next();
// })

const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequest;