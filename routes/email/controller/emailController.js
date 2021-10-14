const nodemailer = require('nodemailer');
const {google} = require ('googleapis')
const smtpTransport = require("nodemailer-smtp-transport")
CLIENT_ID="22212146535-lfca68h6mag0ssvi14g9qadf2cj5i9bo.apps.googleusercontent.com"
CLIENT_SECRET="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"
REDIRECT_URI="https://developers.google.com/oauthplayground"
REFRESH_TOKEN="1//04Sph245F8I9bCgYIARAAGAQSNwF-L9Irv2smMABxS56pnAnT7u6K2hQivBM_n-jM-YfXV3qfoT7WqFeTPIt7Xl0VuIWvl7bLiqo"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
const accessToken = oAuth2Client.getAccessToken()

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service:"gmail",
  auth: {
    type: 'OAuth2',
    user: process.env.email,
    clientId: CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: accessToken
    }
  });
// var transporter = nodemailer.createTransport(smtpTransport({
//   service:"gmail",
//   auth: {
//     user: process.env.email,
//     pass:process.env.password
//     }
//   }));


module.exports = transporter;