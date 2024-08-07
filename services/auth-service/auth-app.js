const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const pgPool = require('../../config/pgPoolConfig')
dotenv.config({path : path.resolve(__dirname , '../../.env')})

// config 
const AUTH_PORT = process.env.AUTH_PORT

// controllers 
const { register, login, refreshToken, logout } = require('./auth-controller')
const { logger : customLogger } = require('../../logs/logger/logger.config')

const app = express();

// middlewares 
app.use(express.json())

// routes
app.post('/register' , register)  

app.post('/login' , login)

app.post('/logout' , logout)

app.post('/refresh-token' , refreshToken)


const authStarter = async() => {
    try{
        await pgPool.connect().then(() => {
            app.listen(AUTH_PORT , () => {
                console.log('listening to PORT : ' , AUTH_PORT)
            })
        }).catch(err => {
            customLogger.error(err , 'auth')
        })
    }catch(err){
        customLogger.error(err , 'auth')
        console.log('Auth Server starter failed : ' , err)
    }
}

authStarter()
