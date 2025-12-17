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

module.exports={validatingSignupdata};