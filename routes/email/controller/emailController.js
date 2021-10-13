const nodemailer = require('nodemailer');
const {google} = require ('googleapis')
const smtpTransport = require("nodemailer-smtp-transport")
const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

const accessToken = oAuth2Client.getAccessToken()
var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.email,
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: accessToken
    }
  }));


module.exports = transporter;