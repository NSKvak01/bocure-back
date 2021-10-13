const nodemailer = require('nodemailer');
const {google} = require ('googleapis')
const smtpTransport = require("nodemailer-smtp-transport")
CLIENT_ID="22212146535-lfca68h6mag0ssvi14g9qadf2cj5i9bo.apps.googleusercontent.com"
CLIENT_SECRET="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"
REDIRECT_URI="https://developers.google.com/oauthplayground"
REFRESH_TOKEN="1//04ZsGBvRvTjv5CgYIARAAGAQSNwF-L9IrT-s2RnSMozshxgxFOXRoCran4Au3uakvmq2NG0h62NiOuOYzhHo7WKQyXmjSehBORus"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
// const accessToken = oAuth2Client.getAccessToken()

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service:"gmail",
  auth: {
    type: 'OAuth2',
    user: process.env.email,
    clientID: CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: "ya29.a0ARrdaM-OkC4RJdimjRg0VmI_DMkb2ttpVJt5Z9zTIQ_RYss2az7KxjPywdven9Cg9vJtMVbScthT9Mi_9LcJvF13vWlIUpOokCpaqLGoQskyYkVimlJV3VcvWUBHlpL6LCHMh5Pwi30AydLNkXM6AgD3j5c-"
    }
  });


module.exports = transporter;