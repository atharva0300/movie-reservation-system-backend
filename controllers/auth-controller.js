const express = require('express')
const createPath = require('../shared/createPath')

// logger
const {logger : customLogger} = require('../logs/logger/logger.config')

const authRegisterController = async (req , res) => {
    console.log('inside auth register controller')
    console.log(req.body)
    const reqPath = req.path
    const newPath = createPath(reqPath)
    console.log(newPath)
    try{
        const response = await fetch(newPath , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(req.body)
        })
        const data = await response.json();
        console.log('data : ' , data)
    
        if(data.code!='authCode0'){
            return res.status(400).json({message : data.message})
        }
        customLogger.info(`fetch successful ${response.status}` , 'server')
        res.status(201).json({message : data.message})
    }catch(err){
        customLogger.error(err , 'server')
        return res.status(500).send('Error in auth , ' , err)
    }
}

const authLoginController = async (req , res) => {
    const newPath = createPath(req.path)
    try{
        const response = await fetch(newPath , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(req.body)
        })
        const data = await response.json()
        customLogger.info(`login successful ${response.status}` , 'server')
        return res.status(response.status).json({message : data.message})
    }catch(err){
        customLogger.error(err , 'server')
        res.status(500).send('Error in auth')
    }
}

const authRefreshTokenController = async(req , res) => {
    const newPath = createPath(reqPath)
    try{
        customLogger.info(`refresh token successful ${response.statys}` , 'server')
        res.send('authlogin controller')
    }catch(err){
        customLogger.error(err , 'server')
        res.status(500).send('Error in auth')
    }
}

module.exports = {authRegisterController , authLoginController , authRefreshTokenController}