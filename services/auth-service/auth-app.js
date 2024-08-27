const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const pgPool = require('../../config/pgPoolConfig')
dotenv.config({path : path.resolve(__dirname , '../../.env')})
const cors = require('cors')

// config 
const AUTH_PORT = process.env.AUTH_PORT

// controllers 
const { register, login, refreshToken, logout, updatePassword } = require('./auth-controller')
const { logger : customLogger } = require('../../logs/logger/logger.config')

const app = express();

// middlewares 
app.use(express.json())

// routes
app.post('/register' , register)  

app.post('/login' , login)

app.get('/logout' , logout)

app.get('/refresh-token' , refreshToken)

app.patch('/update-password' , updatePassword)


const authStarter = async() => {
    try{
        await pgPool.connect().then(() => {
            app.listen(AUTH_PORT , () => {
                console.log('Auth server listening to PORT : ' , AUTH_PORT)
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
