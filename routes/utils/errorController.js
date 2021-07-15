const ErrorMessageHandlerClass = require("./ErrorMessageHandlerClass");

function dispatchErrorDevelopment (error,req,res){
    if(req.originalUrl.startsWith('/api')){
        console.log(req)
        return res.status(error.statusCode).json({
            status:error.status,
            error:error,
            message:error.message,
            stack:error.stack
        })
    }
}
function dispatchErrorProduction (error,req,res){
    if (req.originalUrl.startsWith("/api")){
        if(error.isOperational){
            return res.status(error.statusCode).json({
                status:error.status,
                message:error.message
            })
        }
        // if it's not operational we return "error" and our message we create here
        return res.status(error.statusCode).json({
            status:"Error",
            message:"Something went wrong"
        })
    }
}

function handleMongoDBDuplicate(err){
    let errorMessageDuplicateKey = Object.keys(err.keyValue)[0]
    // we take the first object value which is email user typed
    let errorMessageDuplicateValue = Object.values(err.keyValue)[0]
    // we make customized message using email - email user typed 
    let message = `${errorMessageDuplicateKey} - ${errorMessageDuplicateValue} is taken please choose another one`
    // then return new error we created using error class where we passed message and status code
    return new ErrorMessageHandlerClass(message,400)
}

module.exports = (err, req, res, next) =>{
    err.statusCode= err.statusCode || 500;
    err.status = err.status || "error"

    let error  = {...err}
    error.message = err.message

    if (error.code === 11000 || error.code === 11001){
        error = handleMongoDBDuplicate(error)
    }
    if(process.env.NODE_ENV === "development"){
        dispatchErrorDevelopment(error, req, res)
    } else{
        dispatchErrorProduction(error, req, res)
    }
}