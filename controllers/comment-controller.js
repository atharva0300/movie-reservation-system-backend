const express = require('express')
const createPath = require('../utils/createPath')

const apiType = 'comment'

// logger 
const {logger : customLogger} = require('../logs/logger/logger.config')

const createCommentController = async(req , res) => {
    const newPath =createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(req.body)
        })
        const data = await response.json()
        return res.status(response.status).json({message : data.message})
    }catch(err){
        customLogger.error(err , 'comment')
        return res.status(500).json({message : 'createCommentController error'})
    }
}

// get all the comments associated to a movie
const getCommentsByMovieController = async(req , res) => {
    const newPath = createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json()
        return res.status(response.status).json({message : data.message})
    }catch(err){
        customLogger.error(err , 'comment')
        return res.status(500).json({message : 'createCommentController error'})
    }
}

const updateCommentController = async(req , res) => {
    const newPath =createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(req.body)
        })
        const data = await response.json()
        return res.status(response.status).json({message : data.message})
    }catch(err){
        customLogger.error(err , 'comment')
        return res.status(500).json({message : 'createCommentController error'})
    }
}

const deleteCommentController = async(req , res) => {
    const newPath = createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json()
        return res.status(response.status).json({message : data.message})
    }catch(err){
        customLogger.error(err , 'comment')
        return res.status(500).json({message : 'createCommentController error'})
    }
}

module.exports = {createCommentController , getCommentsByMovieController , updateCommentController , deleteCommentController}