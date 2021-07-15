const User = require("../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function signup(req,res, next){
    const {firstName, lastName, username, email, password} = req.body
    let {errorObj} = res.locals
    if(Object.keys(errorObj).length>0){
        return res.status(500).json({message:"failure", payload:errorObj})    
    } 
    try{
        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(password, salt)
        let newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password:hashedPassword
        })
        let createdUser = await newUser.save()
        res.json({message:"Success - user created"})
    } catch(e){
        next(e)
    }
}

async function login(req,res,next){
    const {email, password} = req.body
    let {errorObj} = res.locals
    if(Object.keys(errorObj).length>0){
        return res.status(500).json({message:"failure", payload:errorObj})    
    } 
    try {
        let foundUser = await User.findOne({email:email})
        if(!foundUser){
            res.status(400).json({message:"error", payload:"Check your email and password"})
        } else{
            let comparedPassword = await bcrypt.compare(password, foundUser.password)
    
        if(!comparedPassword){
            res.status(400).json({message:"error", payload:"Check your email and password"})
        } else {
            let jwtToken = jwt.sign({email:foundUser.email},
                process.env.PRIVATE_JWT_KEY,
                {
                    expiresIn:"100d"
                }
                )
            res.json({message:"Success login "})
        }
        }
    } catch (e) {
        next(e)
    }

}

module.exports={
signup,
login
}