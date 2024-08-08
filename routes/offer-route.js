const express = require('express')
const { getOfferDiscountController } = require('../controllers/offer-controller')
const verifyJWT = require('../middlewares/verifyJWT')
const verifyUserOrAdmin = require('../middlewares/verifyUserOrAdmin')
const router = express.Router()


router.get('/:offerCode' , verifyJWT , verifyUserOrAdmin , getOfferDiscountController)

module.exports = router