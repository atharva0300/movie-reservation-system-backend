const express = require('express')
const { bookBulkTicketController } = require('../controllers/booking-controller')
const router = express.Router()


router.post('/' , bookBulkTicketController)

module.exports = router