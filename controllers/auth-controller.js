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
        return res.status(response.status).json({message : data.message})
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
        console.log(data.refreshToken)
        res.cookie(data.jwtName , data.refreshToken , {httpOnly : data.httpOnly , maxAge : data.maxAge})
        return res.status(response.status).json({message : data.message , data : data.data})
    }catch(err){
        customLogger.error(err , 'server')
        res.status(500).send('Error in auth')
    }
}

const authRefreshTokenController = async (req , res) => {
    const newPath = createPath(req.url , apiType)
    console.log('inside authRefreshToken')
    const cookies = req.cookies
    console.log('cookies : ' , cookies)
    if(!cookies || !cookies?.jwt) return res.status(401).json({message : 'Unauthorized'})
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt
    console.log(refreshToken)
    try{
        const response = await fetch(newPath  ,{
            method : 'GET',
            headers : {
                'Cookie' : Object.entries(req.cookies).map(([key , value]) => `${key}=${value}`).join('; ')
            }
        })
        const data = await response.json();
        console.log('accesstoken : ' , data.data)
        customLogger.info(`refresh token successful ${response.status}` , 'server')
        return res.status(response.status).json({message : data.message , data : data.data})
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'server')
        return res.status(500).json({message : 'Error in Auth'})
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

const logoutController = async (req , res ) => {
    const newPath = createPath(req.url , apiType)
    try{
        const response = await fetch(newPath , {
            method : 'GET',
            headers : {
                'Cookie' : Object.entries(req.cookies).map(([key , value]) => `${key}=${value}`).join('; ')
            }
        })
        console.log(response.status)
        console.log(response.headers)
        console.log(response.ok)
        return res.status(response.status).send(await response.text())
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'server')
        return res.status(500).send('Error in logoutController in main server')
    }
}

module.exports = {authRegisterController , authLoginController , authRefreshTokenController,  updatePasswordController , logoutController}