const express = require('express')
const createPath = require('../utils/createPath')

const apiType = 'movies'

// logger 
const {logger : customLogger} = require('../logs/logger/logger.config')


// get all movies
const getAllMovies = async (req , res) => {  
    const newPath = createPath(req.url , apiType)
        try{
            const response =  await fetch(newPath , {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const data = await response.json()
            customLogger.info(`get all movies successful ${response.status}` , 'server')
            return res.status(response.status).json({message : data.message , data : data.data })
        }catch(err){
            console.log('err : ' , err)
            customLogger.error(err , 'server')
            return res.status(500).json({message : 'getAllMovies error'})
        }
}

// add a new movie 
const addSingleMovie = async(req , res) => {
    const newPath = createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : req.body
        })
        const data = await response.json();
        customLogger.info(`add single movie successful ${response.status}` , 'server')
        return res.status(response.status).json({message : data.message})
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'allNewMovie error'})
    }
}

// get movie details by id
const getSingleMovie = async(req , res) => {
    const newPath =  createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const result = await response.json();
        if(result){
            customLogger.info(`get single movie successful ${response.status}` , 'server')
            return res.status(response.status).json({message : result.message , data : result.data})    
        }
        customLogger.error(err , 'server')
        return res.status(response.status).json({message : 'movie not found'})

    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'allNewMovie error'})
    }
}

// update movie details
const updateSingleMovie = async(req , res) => {
    const newPath =  createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(req.body)
        })
        const data = await response.json();
        customLogger.info(`update single movie successful ${response.status}` , 'server')
        return res.status(response.status).json({message : data.message})
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'allNewMovie error'})
    }
}

// delete single movie
const deleteSingleMovie = async(req , res) => {
    const newPath =  createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : req.body
        })
        const data = await response.json();
        customLogger.info(`delete single movie successful ${response.status}` , 'server')
        return res.status(response.status).json({message : data.message})
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'allNewMovie error'})
    }
}


module.exports = {getAllMovies , getSingleMovie , addSingleMovie , updateSingleMovie , deleteSingleMovie}



