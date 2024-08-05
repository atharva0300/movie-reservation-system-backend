const express = require('express')
const {v4 : uuid4} = require('uuid')


// db client 
const pgPool = require('../../config/pgPoolConfig')

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
        const {userid , screenid , movieid , showtime , seatid } = dataObj
        let result;
        try{
            result = await pgPool.query('INSERT INTO public."Ticket" (ticketid , userid , screenid, movieid , showtime , purchasetime , seatid) VALUES ( $1 , $2 , $3 , $4 ,$5 , $6 , $7)' , [ticketid , userid , screenid , movieid , showtime , purchasetime , seatid])
        }catch(err){
            return res.status(400).json({message : 'invalid insert data'})
        }
        console.log('result : ' , result)
        if(result.rowCount == 1){
                
            // send ticket to the ticket queue 
            await sendTicketToQueue()
            return res.status(200).json({message : 'new ticket inserted'})
        }
        return res.status(400).json({message : 'failed to insert ticket'})
    }catch(err){
        console.log(err)
        return res.status(500).json({message : 'bookBulkTicketController service Error'})
    }
}


module.exports = {bookBulkTicketController}