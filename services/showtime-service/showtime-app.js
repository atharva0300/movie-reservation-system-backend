const express = require('express')
const { slotByTheaterController, slotByMovieController } = require('./showtime-controller');
const app = express();

// port 
const SHOWTIME_PORT = process.env.SHOWTIME_PORT

// middlewares 
app.use(express.json())

// routes
app.get('/theater' , slotByTheaterController)
app.get('/movie' , slotByMovieController)



app.listen(SHOWTIME_PORT , () => {
    console.log('Showtime server running on PORT : ', SHOWTIME_PORT)
})