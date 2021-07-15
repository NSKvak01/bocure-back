let Bocure = require("../model/Bocure")
let User = require("../../user/model/User")


const getAllBocures = async(req,res)=>{
    try {
        const {decodedJwt} = res.locals
        let payload = await User.findOne({email:decodedJwt.email})
            .populate({
                path:"bocures",
                model:Bocure,
                select:"-__v"
            })
            .select ("-email -password -firstName -lastName -__v -_id -username")
        res.json(payload)
    } catch (error) {
        res.status(500).json({error:error, message:error.message})
    }
}

const addBocure = async(req,res)=>{
    try {
        const {decodedJwt} = res.locals
        const {activity, accessibility, type, participants, price, link} = req.body
        const newBocure = new Bocure({
            activity, 
            accessibility, 
            type, 
            participants, 
            price, 
            link
        })
        const savedBocure = await newBocure.save()
        const foundUser = await User.findOne({email:decodedJwt.email})
        foundUser.bocures.push(savedBocure._id)
        await foundUser.save()
        res.json(savedBocure)
    } catch (error) {
        res.status(500).json({error:error, message:error.message})
    }
}

const deleteBocure = async (req,res)=>{
    try {
        let {decodedJwt} = res.locals
        let deletedBocure = await Bocure.findByIdAndDelete(req.params.id)
        let foundUser = await User.findOne({email:decodedJwt.email})
        filteredBocures = foundUser.bocures.filter((item)=>{
            if(item._id.toString()!== req.params.id){
                return item
            }
        })
        foundUser.bocures = filteredBocures
        await foundUser.save()
        res.json(deletedBocure)
    } catch (error) {
        res.status(500).json({error:error, message:error.message})
        
    }
}

module.exports = {
    getAllBocures,
    addBocure,
    deleteBocure
}