const express = require('express')
const { MongoClient } = require('mongodb')
const path = require('path')

// mongodb client 
const mongoClient = new MongoClient(process.env.MONGO_URI)

// logger 
const {logger : customLogger} = require('./logger/logger.config')

const createComment = async(req , res) => {
    const newCommentObj = req.body
    try{
        await mongoClient.connect()
        const db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)
        const commentResponse = await db.collection('comment').updateOne(
            {movieId : newCommentObj.movieId },
            {
                $push : {
                    comments : {
                        userId : parseInt(newCommentObj.userId),
                        comment : newCommentObj.comment
                    }
                }
            }
        )
        if(commentResponse){
            customLogger.info('comment created' , 'comment')
            return res.status(201).json({message : 'comment created'})
        }else{
            customLogger.error('failed to create comment' , 'comment')
            return res.status(400).json({message : 'failed to create comment'})
        }
    }catch(err){
        customLogger.error(err , 'comment')
        return res.status(500).json({message : 'createComment error'})
    }
}

/*
{
    movieId : 
    comments : [
        :index : {
            userid : ,
            comment :
        }
    ]
}
*/

const getCommentsByMovie = async(req , res) => {
    const {id : movieId } = req.params
    try{
        await mongoClient.connect()
        const db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)
        const commentResponse = await db.collection('comment').findOne({movieId : movieId})
        if(commentResponse){
            customLogger.info('found comment by movidId' , 'comment')
            return res.status(201).json({message : 'found comment by movie id' , data : JSON.stringify(commentResponse.comments)})
        }else{
            customLogger.error('comment does not exist for the movie id' , 'comment')
            return res.status(400).json({message : 'comment does not exist for the movie id'})
        } 
    }catch(err){
        customLogger.error(err , 'comment')
        return res.status(500).json({message : 'getCommentBymovie error'})
    }
}

const updateComment = async(req , res) => {
    const commentObj = req.body
    const {id : movieId , userId} = req.params
    try{
        await mongoClient.connect()
        const db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)
        const commentResponse = await db.collection('comment').updateOne(
            {movieId : movieId , 'comments.userId' : parseInt(userId)} , 
            {$set : {
                'comments.$.comment' : commentObj.comment
            }}   
        )
        if(commentResponse){
            customLogger.info('comment updated' , 'comment')
            return res.status(201).json({message : 'comment updated'})
        }else{
            customLogger.error('movie id does not exist for the comment updation' , 'comment')
            return res.status(400).json({message : 'movie id does not exist fro the comment updation'})
        } 
    }catch(err){
        customLogger.error(err , 'comment')
        return res.status(500).json({message : 'updateComment error'})
    }
}

const deleteComment = async(req , res ) => {
    const {id : movieId , userId} = req.params
    try{
        await mongoClient.connect()
        const db = mongoClient.db(process.env.MOVIE_RESERVATION_DB)
        const commentResponse = await db.collection('comment').updateOne(
            {movieId : movieId},
            {
                $pull : {
                    comments : {
                        userId : parseInt(userId)
                    }
                }
            }
        )
        customLogger.info('comment deleted' , 'comment')
        return res.status(201).json({message : 'comment deleted'})
    }catch(err){
        customLogger.error(err , 'comment')
        return res.status(500).json({message : 'delteComment error'})
    }
}

module.exports = {createComment , getCommentsByMovie , updateComment , deleteComment}