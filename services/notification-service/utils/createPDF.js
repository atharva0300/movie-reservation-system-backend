const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const { v4: uuid4 } = require('uuid');
const fsPromises = require('fs').promises

// logger 
const {logger : customLogger} = require('../logger/logger.config')

const checkTicketPdfDir = (targetDir) => {
    return myPromise = new Promise((resolve , reject) => {
        // check if the target Dir exists 
        if(fs.existsSync(targetDir)){
            // target dir exists
            resolve('target dir exists')
        }else{
            // create the target dir
            try{
                fs.mkdirSync(targetDir)
                resolve('created target dir!')
            }catch(err){
                reject(new Error(err))
            }
        }
    })
}

// Function to create the PDF
const createTicketPDF = (data) => {
    const targetDirPath = path.resolve(__dirname, '../files/ticket-pdfs/');
    return new Promise((resolve , reject) => {
        checkTicketPdfDir(targetDirPath).then((value) => {
            // target dir has been created or already exists
    
                // Create a new PDF document
            const doc = new PDFDocument();
    
            // Title
            doc.fontSize(18).font('Helvetica-Bold').text('Ticket Confirmation', {
                align: 'left',
                continued: true
            });
    
            // User Name
            doc.fontSize(14).font('Helvetica').text(`Hello ${data.user.name},`, {
                align: 'left',
                continued: true
            });
    
            // Ticket Details
            doc.fontSize(12);
            const details = [
                `Movie: ${data.movie.movie_name}`,
                `Language: ${data.movie.language}`,
                `Is Adult Rated: ${data.movie.isAdult}`,
                `Showtime: ${data.show.showtime}`,
                `Seats: ${data.seat.seat_number}`,
                `Screen: ${data.screen.screenid}`,
            ];
            
            details.forEach((line, index) => {
                doc.text(line, {
                    align: 'left'
                });
            });
    
            // Footer
            doc.text('Thank you for booking your movie tickets with us!', {
                align: 'left'
            });
    
            // Path and filename
            try {
                const newName = uuid4().toString() + '_' + data.user.userid;
                const fileName = `${newName}_${Date.now()}.pdf`;
                const filePath = path.join(targetDirPath, fileName);
                
    
                // Create a writable stream to save the PDF
                doc.pipe(fs.createWriteStream(filePath));
                doc.end();
    
                const returnObj = {fileName : fileName , filePath : filePath }
                if(returnObj) resolve(returnObj)
            } catch (err) {
                console.log('err in createpdf : ' , err);
                customLogger(err , 'notification')
                reject('returnObj is undefined')
            }
        }).catch(err => {
            customLogger.error(err , 'notification')
        })
    })  
};

module.exports = { createTicketPDF };
