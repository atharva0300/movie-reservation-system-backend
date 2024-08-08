const express = require('express')
const router = express.Router()

// controllers 
const {authRegisterController, authLoginController, authRefreshTokenController, updatePasswordController, logoutController} = require('../controllers/auth-controller')


router.post('/register' , authRegisterController)
router.post('/login' , authLoginController)
router.get('/refresh-token' , authRefreshTokenController)
router.patch('/update-password' , updatePasswordController)
router.get('/logout',  logoutController)

module.exports = router