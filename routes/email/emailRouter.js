const express = require("express")
const router = express.Router()
const dotenv = require('dotenv');
const transporter = require('./controller/emailController');
dotenv.config();


router.post('/send', (req, res) => {
    try {
        console.log(req.body)
      const mailOptions = {
        from: process.env.email, // sender address
        to: req.body.email, // list of receivers
        subject: req.body.subject, // Subject line
        html: `
        <h1>Your friend scheduled an event and invited you!.</h1>
        <h1>Contact Details</h1>
        <div>
          <h2>Name: ${req.body.name}</h2>
          <h2>Email: ${req.body.email}</h2>
          <h2>Subject: ${req.body.subject}</h2>
          <h2>Date: ${req.body.date}</h2>
          <h2>Message: ${req.body.message}</h2>
        </div>
        <button>Yes</button>
        <button>No</button>
        `
      };
  
      transporter.sendMail(mailOptions, function (err, info) {
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