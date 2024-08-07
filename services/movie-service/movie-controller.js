const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { MongoClient } = require('mongodb')
dotenv.config()

// mong client
const mongoClient = new MongoClient(process.env.MONGO_URI.toString())

// logger
const {logger : customLogger} = require('../../logs/logger/logger.config')


const getSingleMovie = async(req , res) => {
    const {id : titleid } = req.params 
    if(!titleid){
        customLogger.error('titleid is undefined' ,  'movie')
        return res.status(400).json({message : 'invalid titleid'})
    }
    try{   
        await mongoClient.connect()
        const db = mongoClient.db('movie-reservation-system')
        const movie = await db.collection('movie_info').findOne({id : titleid})
        const cast = await db.collection('cast').findOne({movieId : titleid})
        const review = await db.collection('review').findOne({movieId : titleid})
        const director = await db.collection('director').findOne({movieId : titleid})
        const genre = await db.collection('genre').findOne({movieId : titleid})
        const trailer_gallery = await db.collection('trailer_gallery').findOne({movieId : titleid})
        const sendingObj  = {movie, cast , review , director , genre , trailer_gallery }
        if(movie){
            customLogger.info('movie found' , 'movie')
            return res.status(200).json({message : 'movie found' , data : JSON.stringify(sendingObj)})
        }else{
            customLogger.error('movie not found' , 'movie')
            return res.status(400).json({message : 'movie not found' , data : JSON.stringify({})})
        }
    }catch(err){
        customLogger.error(err , 'movie')
        return res.status(500).json({message : 'getSingleMovie error'})
    }
}

const insertSingleMovie = async(req , res) => {
    const {movieInfoObject} = req.body
    try{
        return res.status(200).json({message : 'works'})
    }catch(err){
        return res.status(500).json({message : 'getSingleMovie error'})
    }
}

const getAllMovies = async(req , res) => {
    console.log('inside getAllMovies')
    try{
        return res.status(200).json({message : 'works'})
    }catch(err){
        return res.status(500).json({message : 'getAllMovies error'})
    }
}



module.exports = {getSingleMovie , insertSingleMovie , getAllMovies}