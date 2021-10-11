let Bocure = require("../model/Bocure")
let User = require("../../user/model/User")
let axios = require("axios")

const getBocuresFromAPI = async(req,res)=>{
    try {
        let bocure = await handleBocureSearch(req.query.type, req.query.maxprice, req.query.participants)
        res.json(bocure.data)
    } catch (error) {
        res.status(500).json({error:error, message:error.message})
    }
}
const getBocureByKey = async(req,res)=>{
    try {
        let bocure =await axios.get(
            `https://www.boredapi.com/api/activity?key=${req.query.key}`
        );
        res.json(bocure.data)
    } catch (error) {
        res.status(500).json({error:error, message:error.message})
    }
}
const handleBocureSearch = async (type, maxprice, participants) => {
    try {
        let randomBocure = await axios.get(
            `https://www.boredapi.com/api/activity?minprice=0&maxprice=${maxprice}&type=${type}&participants=${participants}`
        );
        return randomBocure;
    } catch (e) {
        return e;
    }
};


const getAllBocures = async(req,res)=>{
    try {
        const {decodedJwt} = res.locals
        let payload = await User.findOne({username:decodedJwt.username})
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
    const {decodedJwt} = res.locals
    console.log(decodedJwt)
    try {
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
        const foundUser = await User.findOne({username:decodedJwt.username})
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
        let foundUser = await User.findOne({username:decodedJwt.username})
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
    deleteBocure,
    getBocuresFromAPI,
    getBocureByKey
}