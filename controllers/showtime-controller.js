const express = require('express');
const createPath = require('../shared/createPath');

const apiType = 'slots'

// logger 
const { logger : customLogger} = require('../logs/logger/logger.config')

const slotTheaterController = async(req , res) => {
    console.log('inside slotTheaterController')
    const theaterName = req.query.q;
    console.log('theaterName : ' , theaterName)
    const pathObj = {
        reqPath : req.path,
        apiType,
        query : theaterName
    }
    const newPath = createPath(pathObj)
    console.log('new path : ' , newPath)
    try{

        const response = await fetch(newPath , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json()
        console.log('data : '  , data)
        customLogger.info(`slow theater successful : ${response.status}` , 'server')
        return res.status(200).json({message : 'works' , data})
    }catch(err){
        console.log(err)
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'slot Theater Controller in main server error'})
    }
}


const slotMovieController = async(req , res) => {
    console.log('inside slotmovieController')
    const movieId = req.query.q;
    console.log('movieId : ' , movieId)
    const pathObj = {
        reqPath : req.path,
        apiType,
        query : movieId
    }
    const newPath = createPath(pathObj)
    console.log('new path : ' , newPath)
    try{

        const response = await fetch(newPath , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json()
        console.log('data : '  , data)
        customLogger.info(`slot movie successful ${response.status}` , 'server')
        return res.status(200).json({message : 'works' , data})
    }catch(err){
        console.log(err)
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'slot Theater Controller in main server error'})
    }
}

module.exports = {slotMovieController , slotTheaterController}