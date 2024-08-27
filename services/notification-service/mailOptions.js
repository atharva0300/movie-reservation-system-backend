const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path : path.resolve(__dirname , './.env')})

// Set up email data
let mailOptions = {
    from: `${process.env.EMAIL_USER}`, // Sender address
    to: '', // List of receivers
    subject: '', // Subject line
    text: '', // Plain text body
    html: '' // HTML body (optional)
};

module.exports = {mailOptions}