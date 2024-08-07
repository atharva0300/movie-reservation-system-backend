const express = require('express')
const {v4 : uuid4} = require('uuid')


// db client 
const pgPool = require('../../config/pgPoolConfig');
const { sendTicketToNotification } = require('./publisher/sendTicketToNotification');
const {logger : customLogger} = require('../../logs/logger/logger.config')


/*
dataObj = {
    ticketid : generated on the server
    userid : client sends the userid ( from req.body or cookies )
    seatid : client sends a list of seatid
    screenid : client sends the screenid 
    movieid  : obtain movie_id from Movie ( client sends the data )
    showtime : obtain movie_time from Slot  
    purchasetime : calculated on server
}
*/

/* 
dummy object 

{
    "userid" : 3,
    "seatid" : [1,2,3],
    "screenid" : 1,
    "movieid" : "tt3576728",
    "showtime" : "123"
}

{
    "user" : {
        "userid" : 3,
        "name" : "",
    },
    "seat" : {
        "seatid" : [1,2,3],
        "seat-number" : "",
    },
    "screen" : {
        "screenid" : 1
    },
    "movie" : {
        "movieid" : "tt3576728",
        "movie-name" : "",
        "language" : "",
        "isAdult" : false
    },
    "show" : {
        "showtime" : "123"
    }
}

*/


const getServerTime = (req , res) => {
    const date = new Date();
    return date.toString()
}

const calculateTicketid = (req , res) => {
    return uuid4()
}

const bookBulkTicketController = async(req , res) => {
    const dataObj = req.body
    console.log('reqBody : ' , dataObj)
    try{
        const ticketid = calculateTicketid();
        const purchasetime = getServerTime();
        console.log('ticketid : ' , ticketid)
        console.log('purchaseTime : ' , purchasetime)
        const {user , screen , movie, show , seat} = dataObj
        let result;
        try{
            if(user.userid && screen.screenid && movie.movieid && show.showtime && seat.seatid) result = await pgPool.query('INSERT INTO public."Ticket" (ticketid , userid , screenid, movieid , showtime , purchasetime , seatid) VALUES ( $1 , $2 , $3 , $4 ,$5 , $6 , $7)' , [ticketid , user.userid , screen.screenid , movie.movieid , show.showtime , purchasetime , seat.seatid])
            else{
                customLogger.error('incomplete data sent' , 'booking')
                return res.status(400).json({message : "incomplete data sent"})
            }
        }catch(err){
            customLogger.error(err , 'booking')
            return res.status(400).json({message : 'invalid insert data'})
        }
        console.log('result : ' , result)
        if(result.rowCount == 1){
            const correlationid = uuid4()
            dataObj['correlation-id'] = correlationid
            console.log('dataObj : ' , dataObj)

            // send ticket to ticket-notification queue 
            await sendTicketToNotification(dataObj).then(accepted => {
                if(accepted){
                    customLogger.info('new ticket inserted' , 'booking')
                    return res.status(200).json({message : 'new ticket inserted'})
                }
            }).catch(err => {
                customLogger.error(err , 'booking')
                return res.status(500).json({message : 'failed to send ticket to notification' , err})
            })
        }else{
            customLogger.info('failed to insert ticket' , 'booking')
            return res.status(400).json({message : 'failed to insert ticket'})
        }
    }catch(err){
        customLogger.error(err , 'booking')
        return res.status(500).json({message : 'bookBulkTicketController service Error'})
    }
}


module.exports = {bookBulkTicketController}