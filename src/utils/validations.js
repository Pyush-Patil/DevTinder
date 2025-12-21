const validator=require("validator");

const validatingSignupdata=(req)=>{

    const { firstname, lastname, emailId, password } = req.body;

    if(!firstname || !lastname)
    {
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Enter a valid Email")
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Enter a Strong Password")
    }
}

const validateEditPofiledata=(req)=>{
    const Allowedfeilds=["Age","Gender","About","photourl","skills"];

    const isEditprofileallowed=Object.keys(req.body).every((feilds)=>Allowedfeilds.includes(feilds));

    return isEditprofileallowed;
}

const validatenewpassword=(newpassword)=>{
    const ispasswordstrong=validator.isStrongPassword(newpassword);
    return ispasswordstrong;
}
module.exports={validatingSignupdata,validateEditPofiledata,validatenewpassword};