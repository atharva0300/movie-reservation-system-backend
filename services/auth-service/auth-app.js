const express = require('express')
const dotenv = require('dotenv')
const pgPool = require('../../config/pgPoolConfig')

dotenv.config()

// config 
const AUTH_PORT = process.env.AUTH_PORT

// controllers 
const { register, login, refreshToken, logout } = require('./auth-controller')

const app = express();

// middlewares 
app.use(express.json())

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
        })
    }catch(err){
        console.log('Auth Server starter failed : ' , err)
    }
}

authStarter()
