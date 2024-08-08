const express = require('express')
const router = express.Router()

// controllers 
const {authRegisterController, authLoginController, authRefreshTokenController, updatePasswordController} = require('../controllers/auth-controller')


router.post('/register' , authRegisterController)
router.post('/login' , authLoginController)
router.post('/refresh-token' , authRefreshTokenController)
router.patch('/update-password' , updatePasswordController)

module.exports = router