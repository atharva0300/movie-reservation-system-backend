const express = require('express')
const app = express()
const dotenv = require('dotenv')
const { searchMovieController, searchTheaterController, searchPlaceController } = require('./search-controller')
dotenv.config()

// port
const SEARCH_PORT = process.env.SEARCH_PORT

// middlwares 
app.use(express.json())

// routes 
app.get('/' , searchMovieController , searchPlaceController , searchTheaterController)


app.listen(SEARCH_PORT , () => {
    console.log('Search service listening on PORT : ' , SEARCH_PORT)
})