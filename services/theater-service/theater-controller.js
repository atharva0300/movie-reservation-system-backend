const express = require('express')

// logger 
const {logger : customLogger} = require('./logger/logger.config')

// client 
const pgPool = require('./config/pgPoolConfig')
const redisClient = require('./config/redisConfig')


const getAllTheaters = async(req , res) => {
    try{
        const redisKey = "get-all-theaters"
        const cachedResult = await redisClient.get(redisKey)
        if(cachedResult){
            return  res.status(200).json({formCache : true , message : 'all theaters fetched' , data : JSON.stringify(cachedResult)})
        }
        const response = await pgPool.query('SELECT * FROM public."Theater"')
        customLogger.info('all theaters feched' , 'theater')
        // store the data in the redis store 
        await redisClient.set(redisKey , JSON.stringify(response.rows))
        return res.status(200).json({fromCache : false, message : 'all theaters fetched' , data : JSON.stringify(response.rows)})
    }catch(err){
        customLogger.error(err , 'theater')
        return res.status(500).json({message : 'getAllTheaters Error'})   
    }
}

const getTheaterById = async(req , res) => {
    const {theaterId} = req.params
    try{
        const response = await pgPool.query('SELECT * FROM public."Theater" WHERE theaterid = $1' , [theaterId])
        if(response.rowCount == 1){
            customLogger.info('theater with id fetched' , 'theater')
            return res.status(200).json({message : 'theater with id fetched' , data : JSON.stringify(response.rows)})
        }else{
            customLogger.info('theater with theaterid does not exists' , 'theater')
            return res.status(400).json({message : 'theater with theaterid does not exists'})
        }
    }catch(err){
        customLogger.error(err , 'theater')
        return res.status(500).json({message : 'getAllTheaters Error'})
    }
}

const getScreenDetailsByTheaterId = async(req , res) => {
    const {theaterId} = req.params
    try{
        // check in redis cache
        const redisKey = "get-screen-details-by-theater-id"
        const cachedResult = await redisClient.get(redisKey)
        if(cachedResult){
            return res.status(200).json({fromCache : true , message : 'screen details with the theaterid fetched' , data : JSON.stringify(cachedResult)})
        }
        // obtain all screenids from theaterId 
        const response = await pgPool.query('SELECT screenid , screen_number, capacity FROM public."Screen" WHERE theaterid = $1' , [theaterId])
        customLogger.info('screen details with the theater id fetched' , 'theater')
        await redisClient.set(redisKey , JSON.stringify(response.rows))
        return res.status(200).json({fromCache : false , message : 'screen details with the theaterid fetched' , data : JSON.stringify(response.rows)})
    }catch(err){
        customLogger.error(err , 'theater')
        return res.status(500).json({message : 'getScreenDetailsByTheaterId Error'})
    }

}

const getSeatDetailsById = async(req , res) => {
    const {screenId} = req.params
    try{
        const redisKey = `seat-details-${screenId}`
        const cachedResult = await redisClient.get(redisKey)
        if(cachedResult){
            return res.status(200).json({fromCache : true , message : 'seat details with the screenid fetched' , data : JSON.stringify(cachedResult)})
        }
        const response = await pgPool.query('SELECT seatid, seatnumber, isavailable FROM public."Seat" WHERE screenid = $1' , [screenId])
        customLogger.info('seat details with the screen id fetched' , 'theater')
        await redisClient.set(redisKey , JSON.stringify(response.rows))
        return res.status(200).json({fromCache : false , message : 'seat details with the screenid fetched' , data : JSON.stringify(response.rows)})
    }catch(err){
        customLogger.error(err , 'theater')
        return res.status(500).json({message : 'getSeatDetailsById Error'})
    }
}

module.exports = {getAllTheaters , getTheaterById , getScreenDetailsByTheaterId , getSeatDetailsById}