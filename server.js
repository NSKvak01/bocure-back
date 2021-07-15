require("dotenv").config()
const mongoose = require("mongoose")
const app = require('./app')

// define port
const port = 8080

// connect our database to port 
mongoose
    .connect("mongodb://localhost:27017/bocure-backend", {
        // need to use these, otherwise mongodb will give errors
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    // console log mongoDB Connected to check if it's really connected in console
    .then (()=> {
        app.listen(port, ()=>{
            console.log(`Server connected on ${port}`)
            console.log("MongoDB Connected")
        })
    })
    .catch((e)=>{
        console.log(e)
    })
    