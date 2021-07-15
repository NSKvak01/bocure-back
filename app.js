var express = require('express');
var logger = require('morgan');
var app = express();


const ErrorMessageHandlerClass = require ("./routes/utils/ErrorMessageHandlerClass")
const errorController = require("./routes/utils/errorController")
const userRouter = require('./routes/user/userRouter');

if (process.env.NODE_ENV === "development"){
  app.use(logger("dev"))
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter)


app.all("*", function (req,res, next){
  next(new ErrorMessageHandlerClass(
      `Cannot find ${res.originalUrl} on this server! Check your URL`, 404
  ))
})

app.use(errorController)

module.exports = app;
