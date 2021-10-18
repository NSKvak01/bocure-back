const express = require("express")
const router = express.Router()
const dotenv = require('dotenv');
const transport = require('./controller/emailController');
dotenv.config();


router.post('/send', (req, res) => {
    try {
        console.log(req.body)
      const mailOptions = {
        from: process.env.email,
        bcc:process.env.email, // sender address
        to: req.body.email, // list of receivers
        subject: req.body.subject, // Subject line
        html: `
        <h1 style="font-size:36px; color:rgb(91, 91, 249);">Your friend invites you to the activity!</h1>
          <div style="border:1px solid rgb(91, 91, 249); width:500px; border-radius:8px; padding:30px;">
            <h2 style="color:black;">Subject: ${req.body.subject}</h2>
            <h2 style="color:black;">Date: ${req.body.date}</h2>
            <h2 style="color:black;">Message: ${req.body.message}</h2>
          </div>
          <div style="display:flex; justify-content:flex-end; margin-top:20px">
          <a href="https://bocure.kvaknastya.com/yes" style="font-size:18px;background-color:rgb(116, 116, 249); color:white; margin-left:10px; margin-right:10px; text-decoration:none;border-radius:8px;border:1px solid rgb(91, 91, 249);width:80px;padding:5px;text-align:center">Yes</a>
          <a href="https://bocure.kvaknastya.com/maybe" style="font-size:18px; background-color:rgb(116, 116, 249); color:white; margin-left:10px; margin-right:10px; text-decoration:none;border-radius:8px;border:1px solid rgb(91, 91, 249);width:80px;padding:5px; text-align:center">Maybe</a>
          <a href="https://bocure.kvaknastya.com/no" style="font-size:18px; background-color:rgb(116, 116, 249);color:white;  margin-left:10px; text-decoration:none;border-radius:8px;border:1px solid rgb(91, 91, 249);width:80px; padding:5px;text-align:center">No</a>
          </div>
        `
      };
  
      transport.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err)
          res.status(500).json({
            success: false,
            // message: 'Something went wrong. Try again later'
            message: err
          });
        } else {
          res.json({
            success: true,
            message: 'Event scheduled. Check your email.'
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Something went wrong. Try again later'
      });
    }
  });
  
  module.exports = router