const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { MongoClient } = require('mongodb')
dotenv.config({path : path.resolve(__dirname , '../../.env')})

const mongoClient = new MongoClient(process.env.MONGO_URI.toString())
mongoClient.connect()
const database = mongoClient.db('movie-reservation-system')

const getSingleMovie = async(req , res) => {
    const {titleid} = req.body
    try{
        const movieInfoCollection = database.collection('movie_info')
        const movie = await movieInfoCollection.findOne({titleid : titleid})
        // const cast = await database.collection('cast').findOne({movieid : titleid})
        // const review = await database.collection('review').findOne({movieid : titleid})
        if(result){
            return res.status(200).json({message : 'movie found' , data : JSON.stringify(movie)})
        }else{
            return res.status(400).json({message : 'movie not found' , data : JSON.stringify(movie)})
        }
    }catch(err){
        return res.status(500).json({message : 'getSingleMovie error'})
    }
}

const insertSingleMovie = async(req , res) => {
    const {movieInfoObject} = req.body
    try{
        const movieInfoCollection = database.collection('movie_info')
        const result = await movieInfoCollection.insertOne(movieInfoObject)
        if(result){
            return res.status(201).json({message : 'movie inserted' , data : JSON.stringify(result)})
        }else{
            return res.status(400).json({message : 'failed to insert movie' , data : JSON.stringify(result)})
        }
    }catch(err){
        return res.status(500).json({message : 'getSingleMovie error'})
    }
}

const getAllMovies = async(req , res) => {
    console.log('inside getAllMovies')
    try{
        const movieInfoCollection = database.collection('movie_info')
        movieInfoCollection.find().toArray().then((result) => {
            console.log('result : ' , result)
            return res.status(200).json({message : 'obtained movies' , data : JSON.stringify(result)})
        }).catch((err) => {
            return res.status(400).json({message : 'movie not found' , data : JSON.stringify({})})
        })
    }catch(err){
        return res.status(500).json({message : 'getAllMovies error'})
    }
}





module.exports = {getSingleMovie , insertSingleMovie , getAllMovies}