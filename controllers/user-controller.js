const express = require('express')
const createPath = require('../utils/createPath')


const apiType = 'user'

// logger 
const {logger : customLogger} = require('../logs/logger/logger.config')

const updateUserNameController = async(req , res) => {
    const newPath = createPath(req.url , apiType)
    try{
        const response = await fetch(newPath, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body) // Ensure req.body is stringified
        });
        const data = await response.json()
        if(response.status == 200){
            customLogger.info('username updated' , 'user')
            return res.status(response.status).json({message : data.message , data : data.data})    
        }else{
            customLogger.info(data.message , 'user')
            return res.status(response.status).json({message : data.message})
        }
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'user')
        return res.status(500).json({message : 'getUserNameController error'})
    }
}

module.exports = {updateUserNameController}