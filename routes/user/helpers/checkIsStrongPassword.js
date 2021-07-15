const {isStrongPassword}=require("validator")

function checkIsStrongPassword(req,res,next){
    let {password} = req.body
    let {errorObj} = res.locals
    if(!isStrongPassword(password)){
        errorObj.weakPassword = "Password must include 1 lowercase, 1 uppercase, 1 special character, 1 number, and a length of 8"
    }
    next()
}

module.exports = checkIsStrongPassword