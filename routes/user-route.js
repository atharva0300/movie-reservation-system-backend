const express = require('express');
const { updateUserNameController } = require('../controllers/user-controller');
const router = express.Router()
const verifyJWT = require('../middlewares/verifyJWT')

router.patch('/username' , verifyJWT , updateUserNameController);

module.exports = router;
