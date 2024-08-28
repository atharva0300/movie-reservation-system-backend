const nodemailer = require('nodemailer')
const path = require('path')

const transporter = nodemailer.createTransport({
    service : 'Outlook365',
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASSWORD
    },
    secure: true, // Use SSL/TLS
    port: 465 // Port for SSL
})


module.exports = {transporter}

