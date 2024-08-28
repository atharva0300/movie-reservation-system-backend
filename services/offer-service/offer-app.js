const express = require('express')
const path  =require('path')
const { getOfferDiscount } = require('./offer-controller')

const app = express()

// middlware
app.use(express.json())

// routes 
app.get('/:offerCode' , getOfferDiscount)



app.listen(process.env.OFFER_PORT  , () => {
    console.log('Offer service running on PORT : ' , process.env.OFFER_PORT)
})