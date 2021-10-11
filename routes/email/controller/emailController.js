const nodemailer = require('nodemailer');
const smtpTransport = require("nodemailer-smtp-transport")
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
      user: process.env.email,
      pass: process.env.password 
    }
  }));

module.exports = transporter;