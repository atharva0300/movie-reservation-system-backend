const express = require('express')
const amqp = require('amqplib')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path : path.resolve(__dirname , '../../../.env')})
const {TICKET_EXCHANGE_NAME , TICKET_NOTIFICATION_ROUTING_KEY , TICKET_NOTIFICAITON_QUEUE} = require('../conifg/rabbitmq.config')
const {transporter} = require('../sendEmail')
const {mailOptions} = require('../mailOptions')
const {v4 : uuid4} = require('uuid')
const {logger : customLogger} = require('../../../logs/logger/logger.config')
 

const sendTicketToEmail = async (data) => {
    console.log('trying to send email')
    try{
        // send mail 
        mailOptions['to'] = `${data.user.email}`
        mailOptions['subject'] = `Ticket Confirmation : ${uuid4()}`
        mailOptions['text'] = `
            Hello ${data.user.name},
            \nYour Movie ticket has been confirmed. Below are the details of your ticket.
            \n\nMovie : ${data.movie.movie_name}
            \nLanguage : ${data.movie.language}
            \nis Adult Rated : ${data.movie.isAdult}
            \nShowtime : ${data.show.showtime}
            \nSeats : ${data.seat.seat_number}
            \nScreen : ${data.screen.screenid}

            \n\nThank you for booking your movie tickets with us!
        `
        console.log('mailOptions : ' , mailOptions)
        const info = await transporter.sendMail(mailOptions)
        console.log('info : ', info.response)
        customLogger.info('email sent' , 'notification')
    }catch(err){
        customLogger.error(err , 'notification')
        console.log('err : ' , err)
    }
}

const consumeTicket = async () => {
    try{
        console.log('inside consumeTicket')
        console.log('rabbitmq port : ' , process.env.DOCKER_RABBITMQ_PORT)
        const connection = await amqp.connect(`amqp://localhost:${process.env.DOCKER_RABBITMQ_PORT}`)
        const channel = await connection.createChannel()
    
        channel.assertExchange(TICKET_EXCHANGE_NAME , 'topic' , {durable : true})
        channel.assertQueue(TICKET_NOTIFICAITON_QUEUE , { durable : true})
    
        channel.bindQueue(TICKET_NOTIFICAITON_QUEUE , TICKET_EXCHANGE_NAME , TICKET_NOTIFICATION_ROUTING_KEY)
        console.log('waiting for messages...')
        channel.consume(TICKET_NOTIFICAITON_QUEUE , async (message) => {
            if(message.content){
                customLogger.info('message.content true' , 'notification')
                try{
                    const data = JSON.parse(message.content.toString())
                    console.log('notification data received : ' , data)
                    await sendTicketToEmail(data)
                    channel.ack(message);
                    customLogger.info('message consumed from queue : ack' , 'notification')
                }catch(err){
                    console.log('err : ' , err)
                    customLogger.error(`nack : ${err}` , 'notification')
                    channel.nack(message)   // failed to parse the message
                }
            }
        } , {noAck : false})
    }catch(err){
        customLogger.error(err , 'notification')
        console.log('error in receive ticket in notification service : ' , err)
    }
}

consumeTicket()