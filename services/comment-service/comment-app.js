const express = require('express')
const path = require('path');
const { createComment, getCommentsByMovie, updateComment, deleteComment } = require('./comment-controller');

const app = express();


// middlwares 
app.use(express.json())

// routes 

// create comment 
app.post('/' , createComment)

// read comment
app.get('/:id' , getCommentsByMovie)

// update comment
app.patch('/:id/:userId' , updateComment)

// delete comment
app.delete('/:id/:userId' , deleteComment)


app.listen(process.env.COMMENT_PORT , () => {
    console.log('Comment service is listening on PORT : ', process.env.COMMENT_PORT)
})