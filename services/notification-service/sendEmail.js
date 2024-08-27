const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path : path.resolve(__dirname , './.env')})

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

