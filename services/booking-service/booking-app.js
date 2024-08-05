const express = require('express')
const dotenv = require('dotenv');
const path = require('path')
const { bookBulkTicketController } = require('./booking-controller');
dotenv.config({path : path.resolve(__dirname , '../../.env')})

const BOOKING_PORT = process.env.BOOKING_PORT

const app = express();

// middleware
app.use(express.json())

// routes 
app.use('/' ,  bookBulkTicketController)

app.listen(BOOKING_PORT , () => {
    console.log('booking-service listening on PORT : ' , BOOKING_PORT);
})
