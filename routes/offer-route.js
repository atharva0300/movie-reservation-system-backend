const express = require('express')
const { getOfferDiscountController } = require('../controllers/offer-controller')
const router = express.Router()


router.get('/:offerCode' , getOfferDiscountController)

module.exports = router