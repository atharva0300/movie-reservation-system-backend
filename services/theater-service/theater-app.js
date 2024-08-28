const express = require('express')
const path = require('path')
const { getAllTheaters, getTheaterById, getScreenDetailsByTheaterId, getSeatDetailsById } = require('./theater-controller')

const app = express()

// middlware 
app.use(express.json())

// routes 

// THEATER
// get all theaters 
app.get('/' , getAllTheaters)

// get theater details by id 
app.get('/:theaterId' , getTheaterById)


// SCREENS
// get screen details by id 
app.get('/screen/:theaterId' , getScreenDetailsByTheaterId)


// SEATS 
// get seat details by id 
app.get('/seat/:screenId' , getSeatDetailsById)


app.listen(process.env.THEATER_PORT , () => {
    console.log('Theater service running on port : ' , process.env.THEATER_PORT)
})