const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { MongoClient } = require('mongodb')
dotenv.config({path : path.resolve(__dirname , '../../.env')})

const mongoClient = new MongoClient(process.env.MONGO_URI.toString())

const {logger : customLogger} = require('../../logs/logger/logger.config')


const getSingleMovie = async(req , res) => {
    console.log('inside get single movie')
    const {id : titleid } = req.params 
    console.log('titleid : '  , titleid)
    if(titleid == undefined){
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
        /*
        const movieInfoCollection = database.collection('movie_info')
        const result = await movieInfoCollection.insertOne(movieInfoObject)
        if(result){
            return res.status(201).json({message : 'movie inserted' , data : JSON.stringify(result)})
        }else{
            return res.status(400).json({message : 'failed to insert movie' , data : JSON.stringify(result)})
        }
            */
    }catch(err){
        return res.status(500).json({message : 'getSingleMovie error'})
    }
}

const getAllMovies = async(req , res) => {
    console.log('inside getAllMovies')
    try{
        /*
        const movieInfoCollection = database.collection('movie_info')
        movieInfoCollection.find().toArray().then((result) => {
            console.log('result : ' , result)
            return res.status(200).json({message : 'obtained movies' , data : JSON.stringify(result)})
        }).catch((err) => {
            return res.status(400).json({message : 'movie not found' , data : JSON.stringify({})})
        })
            */
    }catch(err){
        return res.status(500).json({message : 'getAllMovies error'})
    }
}





module.exports = {getSingleMovie , insertSingleMovie , getAllMovies}