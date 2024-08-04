const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const BOOKING_PORT = process.env.BOOKING_PORT

const app = express();

app.listen(BOOKING_PORT , () => {
    console.log('booking-service listening on PORT : ' , BOOKING_PORT);
})
