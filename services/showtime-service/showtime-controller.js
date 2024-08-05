const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path : path.resolve(__dirname , '../../.env')})

// db clients 
const pgPool = require('../../config/pgPoolConfig')


const slotByTheaterController = async(req , res) => {
    console.log('inside slotbytheatercontroller')
    const theaterId = req.query.q
    console.log('theaterId : ' , theaterId)
    try{
        // fetch all the slots mapping to a theaterid
        const result = await pgPool.query('SELECT * FROM public."Slot" WHERE theaterid = $1' , [theaterId])
        console.log(result.rowCount)
        const sendObj = {
            data : result.rows
        }
        return res.status(200).json({message : 'fetched slot' , data : JSON.stringify(sendObj)})
    }catch(err){
        return res.status(500).json({message : 'showTime Error'})
    }
}

const slotByMovieController = async(req , res) => {
    const movieId = req.query.q
    console.log('movieId : ' , movieId)
    try{   
        // fetch all the slots mapping to a movieid
        const result = await pgPool.query('SELECT * FROM public."Slot" WHERE movieid = $1' , [movieId])
        console.log(result.rowCount)
        const sendObj = {
            data : result.rows
        }
        return res.status(200).json({message : 'fetched slot' , data : JSON.stringify(sendObj)})
    }catch(err){
        return res.status(500).json({message : 'showTime Error'})
    }
}



module.exports = {slotByTheaterController, slotByMovieController}