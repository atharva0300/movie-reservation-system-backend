const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const {MongoClient} = require('mongodb')
dotenv.config({path : path.resolve(__dirname , '../../.env')})

// db clients
const mongoClient = new MongoClient(process.env.MONGO_URI.toString())
const pgPool = require('../../config/pgPoolConfig')

const searchMovieController = async(req , res , next) => {
    const searchTerm = req.query.q
    console.log('search term : ' , searchTerm)
    try{
        await mongoClient.connect();
        const db = mongoClient.db('movie-reservation-system')

        // search in movie_info 
        await db.collection('movie_info').findOne({titleText : searchTerm}).then((movie) => {
            if(movie){
                console.log('found in movie')
                const sendObj = {
                    movie,
                    searchFoundIn : 'movie_info'
                }
                return res.status(200).json({message : 'search found' , data : JSON.stringify(sendObj)})
            }else{
                next()
            }
        }).catch(err => {
            return res.status(500).json({message : 'movie read mongodb error' , data : JSON.stringify({})})
        })
    }catch(err){
        return res.status(500).json({message : 'searchMovie Error'})
    }
}


const searchPlaceController = async(req , res , next) => {
    const searchTerm = req.query.q;
    console.log('search query : ' , searchTerm)
    try{
        // search in place 
        await pgPool.query('SELECT * FROM public."Place" WHERE city = $1' , [searchTerm]).then((result) => {
            if(result.rowCount !=0 ){
                console.log('found in place')
                const sendObj = {
                    place : result.rows,
                    searchFoundIn : 'place'
                }
                return res.status(200).json({message : 'search found' , data : JSON.stringify(sendObj)})
            }else{
                next()
            }
        }).catch(err => {
            return res.status(500).json({message : 'place read postgres error' , data : JSON.stringify({})})
        })
    }catch(err){
        return res.status(500).json({message : 'searchPlace Error'})
    }
}

const searchTheaterController = async(req , res) => {
    const searchTerm = req.query.q;
    console.log('search term : ' , searchTerm);
    try{
        // search in theater
        await pgPool.query('SELECT * FROM public."Theater" WHERE name = $1' , [searchTerm]).then((result) => {
            if(result.rowCount != 0){
                console.log('found in theaters')
                const sendObj = {
                    theater : result.rows,
                    searchFoundIn : 'theaters'
                }
                return res.status(200).json({message : 'search found' , data : JSON.stringify(sendObj)})
            }else{
                return res.status(400).json({message : 'search term not found' , data : JSON.stringify({})})
            }
        }).catch(err => {
            return res.status(500).json({message : 'theater read postgres error' , data : JSON.stringify({})})
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({message : 'searchTheater Error'})
    }
}


module.exports = {searchMovieController , searchPlaceController , searchTheaterController}