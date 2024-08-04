const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express();

// middlewares 
app.use(cors())
app.use(bodyParser.json())

// routes 


// error handling middleware
app.use((err , req , res, next) => {
    console.error(err.stack)
    res.status(500).send({message : err.message})
})

module.exports = app;