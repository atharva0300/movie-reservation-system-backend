const express = require('express')

// logger 
const {logger : customLogger} = require('../../logs/logger/logger.config')

// pgclient 
const pgPool = require('../../config/pgPoolConfig')

const getAllTheaters = async(req , res) => {
    try{
        const response = await pgPool.query('SELECT * FROM public."Theater"')
        customLogger.info('all theaters feched' , 'theater')
        return res.status(200).json({message : 'all theaters fetched' , data : JSON.stringify(response.rows)})
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
        // obtain all screenids from theaterId 
        const response = await pgPool.query('SELECT screenid , screen_number, capacity FROM public."Screen" WHERE theaterid = $1' , [theaterId])
        customLogger.info('screen details with the theater id fetched' , 'theater')
        return res.status(200).json({message : 'screen details with the theaterid fetched' , data : JSON.stringify(response.rows)})
    }catch(err){
        customLogger.error(err , 'theater')
        return res.status(500).json({message : 'getScreenDetailsByTheaterId Error'})
    }

}

const getSeatDetailsById = async(req , res) => {
    const {screenId} = req.params
    try{
        const response = await pgPool.query('SELECT seatid, seatnumber, isavailable FROM public."Seat" WHERE screenid = $1' , [screenId])
        customLogger.info('seat details with the screen id fetched' , 'theater')
        return res.status(200).json({message : 'seat details with the screenid fetched' , data : JSON.stringify(response.rows)})
    }catch(err){
        customLogger.error(err , 'theater')
        return res.status(500).json({message : 'getSeatDetailsById Error'})
    }
}

module.exports = {getAllTheaters , getTheaterById , getScreenDetailsByTheaterId , getSeatDetailsById}