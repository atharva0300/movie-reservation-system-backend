const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

// db clients 
const pgPool = require('../../config/pgPoolConfig')

// logger 
const {logger : customLogger} = require('../../logs/logger/logger.config')


const slotByTheaterController = async(req , res) => {
    const theaterId = req.query.q
    try{
        // fetch all the slots mapping to a theaterid
        const result = await pgPool.query('SELECT * FROM public."Slot" WHERE theaterid = $1' , [theaterId])
        const sendObj = {
            data : result.rows
        }
        customLogger.info('fetched slot by theater' , 'showtime')
        return res.status(200).json({message : 'fetched slot' , data : JSON.stringify(sendObj)})
    }catch(err){
        customLogger.error(err , 'showtime')
        return res.status(500).json({message : 'showTime Error'})
    }
}

const slotByMovieController = async(req , res) => {
    const movieId = req.query.q
    try{   
        // fetch all the slots mapping to a movieid
        const result = await pgPool.query('SELECT * FROM public."Slot" WHERE movieid = $1' , [movieId])
        const sendObj = {
            data : result.rows
        }
        customLogger.info('fetched slot by movie' , 'showtime')
        return res.status(200).json({message : 'fetched slot' , data : JSON.stringify(sendObj)})
    }catch(err){
        customLogger.error(err , 'showtime')
        return res.status(500).json({message : 'showTime Error'})
    }
}



module.exports = {slotByTheaterController, slotByMovieController}