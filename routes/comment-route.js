const express = require('express')
const { createCommentController, getCommentsByMovieController, updateCommentController, deleteCommentController } = require('../controllers/comment-controller')
const router = express.Router()

// middlewares
const verifyJWT = require('../middlewares/verifyJWT')
const verifyAdmin = require('../middlewares/verifyAdmin')
const verifyUser = require('../middlewares/verifyUser')

router.post('/' , verifyJWT , verifyUser , createCommentController)

router.get('/:id' , getCommentsByMovieController)

router.patch('/:id/:userId' , verifyJWT , verifyUser , updateCommentController)

router.delete('/:id/:userId' , verifyJWT , verifyAdmin , deleteCommentController)


module.exports = router