const {isEmail, isAlpha, isAlphanumeric} = require("validator")
function checkIsEmail (req,res,next){
    let {errorObj}=res.locals
    let {email} =req.body
    if(!isEmail(email)){
        errorObj.wrongEmailFormat = "Must be in email format"
    } 
    next()
}

function checkIsAlpha(req,res, next){
    let {errorObj} = res.locals
    let body = req.body
    for (key in body){
        if(key ==="firstName" || key==="lastName"){
            if(!isAlpha(body[key])){
                errorObj[`${key}`]=`${key} can only contain characters`
            }
        }
    }
    next()
}

function checkIsAlphanumeric (req,res,next){
    let {username} =req.body
    let {errorObj} = res.locals
    if(!isAlphanumeric(username)){
        errorObj.usernameError = "Username cannot contain special characters"
    }
    next()
}

module.exports = {
    checkIsEmail,
    checkIsAlpha,
    checkIsAlphanumeric,
}