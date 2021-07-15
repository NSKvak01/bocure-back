const {isEmpty} = require("validator")

function checkIsEmpty(req,res,next){
    let {errorObj} = res.locals
    let body = req.body
    for (key in body){
        if(isEmpty(body[key])){
            errorObj[key] = `${key} cannot be empty`
        }
    } if(Object.keys(errorObj).length>0){
        return res.status(500).json({
            message:"failure", payload:errorObj
        })
    } else{
        next()
    }
}

module.exports = checkIsEmpty