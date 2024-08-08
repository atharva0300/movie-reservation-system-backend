const createPath = require('../utils/createPath')

// logger
const {logger : customLogger} = require('../logs/logger/logger.config')

const apiType = 'auth'

const authRegisterController = async (req , res) => {
    const newPath = createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(req.body)
        })
        const data = await response.json();
    
        if(data.code!='authCode0'){
            customLogger.error(data , 'auth')
            return res.status(400).json({message : data.message})
        }
        customLogger.info(`user registered successfully ${response.status}` , 'server')
        res.status(201).json({message : data.message})
    }catch(err){
        customLogger.error(err , 'server')
        return res.status(500).send('Error in auth , ' , err)
    }
}

const authLoginController = async (req , res) => {
    const newPath = createPath(req.url , apiType)
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
    const newPath = createPath(req.url , apiType)
    try{
        customLogger.info(`refresh token successful ${response.statys}` , 'server')
        res.send('authlogin controller')
    }catch(err){
        customLogger.error(err , 'server')
        res.status(500).send('Error in auth')
    }
}

const updatePasswordController = async(req , res) => {
    const newPath = createPath(req.url , apiType)
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
        customLogger.error(err , 'server')
        res.status(500).send('Error in updatePasswordController in main server')
    }
}

module.exports = {authRegisterController , authLoginController , authRefreshTokenController,  updatePasswordController}