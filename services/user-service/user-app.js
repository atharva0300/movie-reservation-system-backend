const express = require('express')
const dotenv = require('dotenv');
const { updateUserName } = require('./user-controller');
const { StepPage } = require('twilio/lib/rest/studio/v1/flow/engagement/step');
dotenv.config()

const USER_PORT = process.env.USER_PORT

const app = express();

// middlewares
app.use(express.json())

// routes
// update username
app.patch('/username' , updateUserName)


app.listen(USER_PORT , () => {
    console.log('user-service listening on PORT : ' , USER_PORT);
})
