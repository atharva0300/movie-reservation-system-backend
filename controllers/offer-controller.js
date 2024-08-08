const express = require('express')
const createPath = require('../utils/createPath')


const apiType = 'offer'

// logger 
const {logger : customLogger} = require('../logs/logger/logger.config')

const getOfferDiscountController = async(req , res) => {
    const newPath = createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'GET'
        })
        const data = await response.json()
        if(response.status == 200){
            return res.status(response.status).json({message : data.message , data : data.data})    
        }else{
            return res.status(response.status).json({message : data.message})
        }
    }catch(err){
        customLogger.error(err , 'offer')
        return res.status(500).json({message : 'getOfferDiscountController error'})
    }
}

module.exports = {getOfferDiscountController}