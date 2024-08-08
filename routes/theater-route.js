const express = require('express')
const router = express.Router()
const { getAllTheatersController, getTheaterByIdController, getScreenDetailsByTheaterIdController, getSeatDetailsByIdController } = require('../controllers/theater-controller')

router.get('/' , getAllTheatersController)

router.get('/:theaterId' , getTheaterByIdController)

router.get('/screen/:theaterId' , getScreenDetailsByTheaterIdController)

router.get('/seat/:screenId' , getSeatDetailsByIdController)

module.exports = router

