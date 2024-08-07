const {transporter} = require('../sendEmail')
const {mailOptions} = require('../mailOptions')
const {v4 : uuid4} = require('uuid')
const {createTicketPDF} = require('./../utils/createPDF')

const sendTicketToEmail = async (data) => {
    try{
        createTicketPDF(data).then(async pdfData => {
            const {fileName : pdfFileName , filePath : pdfFilePath} = pdfData

            // send mail 
            mailOptions['to'] = `${data.user.email}`
            mailOptions['subject'] = `Ticket Confirmation : ${uuid4()}`
            mailOptions['text'] = `
                Hello ${data.user.name},
                \nYour Movie ticket has been confirmed. Below are the details of your ticket.
                \n\nMovie : ${data.movie.movie_name}
                \nLanguage : ${data.movie.language}
                \nis Adult Rated : ${data.movie.isAdult}
                \nShowtime : ${data.show.showtime}
                \nSeats : ${data.seat.seat_number}
                \nScreen : ${data.screen.screenid}

                \n\nThank you for booking your movie tickets with us!
            `
            mailOptions['attachments'] = [
                {
                    filename : pdfFileName,
                    path : pdfFilePath,
                    contentType : 'application/pdf'
                }

            ]
            // console.log('mailOptions : ' , mailOptions)
            await transporter.sendMail(mailOptions)
            customLogger.info('email sent' , 'notification')
            
        }).catch(err => {
            console.log('err : ' , err)
            customLogger.error(err , 'notification')
        })
    }catch(err){
        customLogger.error(err , 'notification')
        console.log('err : ' , err)
    }
}


module.exports = {sendTicketToEmail}