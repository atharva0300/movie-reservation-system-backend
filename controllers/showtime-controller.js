const express = require('express');
const createPath = require('../utils/createPath');

const apiType = 'slots'

// logger 
const { logger : customLogger} = require('../logs/logger/logger.config')

const slotTheaterController = async(req , res) => {
    const newPath = createPath(req.url , apiType)
    try{

        const response = await fetch(newPath , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json()
        customLogger.info(`slot theater successful : ${response.status}` , 'server')
        return res.status(200).json({message : 'works' , data})
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'slot Theater Controller in main server error'})
    }
}


const slotMovieController = async(req , res) => {
    const newPath = createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json()
        customLogger.info(`slot movie successful ${response.status}` , 'server')
        return res.status(200).json({message : 'slot movie successful' , data})
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'slot Movie Controller in main server error'})
    }
}

module.exports = {slotMovieController , slotTheaterController}