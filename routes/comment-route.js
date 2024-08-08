const express = require('express')
const { createCommentController, getCommentsByMovieController, updateCommentController, deleteCommentController } = require('../controllers/comment-controller')
const router = express.Router()

router.post('/' , createCommentController)

router.get('/:id' , getCommentsByMovieController)

router.patch('/:id/:userId' , updateCommentController)

router.delete('/:id/:userId' , deleteCommentController)


module.exports = router