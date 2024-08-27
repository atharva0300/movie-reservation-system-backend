const express = require('express')
const dotenv = require('dotenv')
const path  =require('path')
const { getOfferDiscount } = require('./offer-controller')
dotenv.config({path : path.resolve(__dirname , '../../.env')})

const app = express()

// middlware
app.use(express.json())

// routes 
app.get('/:offerCode' , getOfferDiscount)



app.listen(process.env.OFFER_PORT  , () => {
    console.log('Offer service running on PORT : ' , process.env.OFFER_PORT)
})