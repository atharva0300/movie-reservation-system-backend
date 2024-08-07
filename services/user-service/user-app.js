const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const USER_PORT = process.env.USER_PORT

const app = express();

// middlewares

// routes

app.listen(USER_PORT , () => {
    console.log('user-service listening on PORT : ' , USER_PORT);
})
