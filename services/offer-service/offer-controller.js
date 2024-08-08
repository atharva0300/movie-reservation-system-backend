const express = require('express')

// logger 
const {logger : customLogger} = require('../../logs/logger/logger.config')

// pgclient 
const pgPool = require('../../config/pgPoolConfig')


const getOfferDiscount = async(req , res ) => {
    const {offerCode} = req.params
    try{
        const response = await pgPool.query('SELECT discount from public."Offer" WHERE code = $1' , [offerCode])
        if(response.rowCount == 1){
            console.log(response)
            customLogger.info('found the offer' , 'offer')
            return res.status(200).json({message : 'found offer' , data : JSON.stringify(response.rows[0].discount)})
        }else{
            customLogger.info('offerCode does not exists' , 'offer')
            return res.status(400).json({message : 'Offercode does not exists'})
        }
    }catch(err){
        customLogger.error(err , 'offer')
        return res.status(500).json({message : 'getOfferDetails Error'})
    }
}

module.exports = {getOfferDiscount}