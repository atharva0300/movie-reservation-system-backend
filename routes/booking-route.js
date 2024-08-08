const express = require('express')
const { bookBulkTicketController } = require('../controllers/booking-controller')
const router = express.Router()

// middlewares
const verifyJWT = require('../middlewares/verifyJWT')
const verifyUser = require('../middlewares/verifyUser')


router.post('/' , verifyJWT , verifyUser , bookBulkTicketController)

module.exports = router