const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')
const os = require('os')

// loading the dotenv file
dotenv.config()

const app = express();

// controllers 
const {authController} = require('./controllers/auth-controller')


// middlewares 
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended : false}))

// routes 
app.use('/api/auth/' , require('./routes/auth-route'))
app.use('/api/movies/' , require('./routes/movie-route'))
app.use('/api/search' , require('./routes/search-route'))



// error handling middleware
app.use((err , req , res, next) => {
    console.error(err.stack)
    res.status(500).send({message : err.message})
})

module.exports = app;