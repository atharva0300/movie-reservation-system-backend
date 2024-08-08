const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')

// loading the dotenv file
dotenv.config()

const app = express();


// middlewares 
app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended : false}))

// routes 
app.use('/api/auth/' , require('./routes/auth-route'))
app.use('/api/movies/' , require('./routes/movie-route'))
app.use('/api/search' , require('./routes/search-route'))
app.use('/api/slots/' , require('./routes/showtime-route'))
app.use('/api/booking/' , require('./routes/booking-route'))
app.use('/api/comment/' , require('./routes/comment-route'))
app.use('/api/offer/' , require('./routes/offer-route'))
app.use('/api/theater' , require('./routes/theater-route'))


// error handling middleware
app.use((err , req , res, next) => {
    console.error(err.stack)
    res.status(500).send({message : err.message})
})

module.exports = app;