const adminauth=(req,res,next)=>{
  //Writing Logic to Authenticate user
  console.log("Admin is Getting Authorized!");
  const token="xyz";
  const isAdminauthorized=token==="xyz";
  if(!isAdminauthorized)
  {
    res.status(401).send("Unauthorized User");
  }
  else
  {
    next();
  }
}

const UserAuth=(req,res,next)=>{
  //Writing Logic to Authenticate user
  console.log("User is Getting Authorized!");
  const token="xyz";
  const isuserauthorized=token==="xyz";
  if(!isuserauthorized)
  {
    res.status(401).send("Unauthorized User");
  }
  else
  {
    next();
  }
}

module.exports={
    adminauth,
    UserAuth
}