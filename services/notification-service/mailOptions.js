const path = require('path')

// Set up email data
let mailOptions = {
    from: `${process.env.EMAIL_USER}`, // Sender address
    to: '', // List of receivers
    subject: '', // Subject line
    text: '', // Plain text body
    html: '' // HTML body (optional)
};

module.exports = {mailOptions}