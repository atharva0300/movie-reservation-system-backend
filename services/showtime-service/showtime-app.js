const express = require('express')
const dotenv = require('dotenv')
const path = require('path');
const { slotByTheaterController, slotByMovieController } = require('./showtime-controller');
dotenv.config({path : path.resolve(__dirname , '../../.env')})
const app = express();

// port 
const SHOWTIME_PORT = process.env.SHOWTIME_PORT

// middlewares 
app.use(express.json())

// routes
app.get('/test' , (req , res) => {
    console.log('test works')
    res.send('test works')
})
app.get('/theater' , slotByTheaterController)
app.get('/movie' , slotByMovieController)



app.listen(SHOWTIME_PORT , () => {
    console.log('Showtime server running on PORT : ', SHOWTIME_PORT)
})