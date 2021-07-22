const mongoose = require("mongoose")

let bocureSchema = new mongoose.Schema({
    activity:{
        type:String
    },
    accessibility:{
        type:String
    },
    type:{
        type:String
    },
    participants:{
        type:Number
    },
    price:{
        type:String
    },
    link:{
        type:String
    }
})

module.exports = mongoose.model("bocure", bocureSchema)