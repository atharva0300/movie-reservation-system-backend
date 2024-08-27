const express = require('express')
const amqp = require('amqplib')
const dotenv = require('dotenv')
dotenv.config()

const {TICKET_EXCHANGE_NAME , TICKET_NOTIFICATION_ROUTING_KEY , TICKET_NOTIFICAITON_QUEUE} = require('../conifg/rabbitmq.config')

const {logger : customLogger} = require('../../../logs/logger/logger.config')

const { sendTicketToEmail } = require('../utils/sendTicketToEmail')
 

const consumeTicket = async () => {
    console.log('waiting for messages...')
    try{
        const connection = await amqp.connect(`amqp://localhost:${process.env.DOCKER_RABBITMQ_PORT}`)
        const channel = await connection.createChannel()
    
        channel.assertExchange(TICKET_EXCHANGE_NAME , 'topic' , {durable : true})
        channel.assertQueue(TICKET_NOTIFICAITON_QUEUE , { durable : true})
    
        channel.bindQueue(TICKET_NOTIFICAITON_QUEUE , TICKET_EXCHANGE_NAME , TICKET_NOTIFICATION_ROUTING_KEY)
        channel.consume(TICKET_NOTIFICAITON_QUEUE , async (message) => {
            if(message.content){
                customLogger.info('message.content true' , 'notification')
                try{
                    const data = JSON.parse(message.content.toString())
                    console.log('notification data received : ' , data)
                    sendTicketToEmail(data).then( () => {
                        customLogger.info('message consumed from queue : ack' , 'notification')
                        channel.ack(message)
                    }).catch(err => {
                        customLogger.info('message consumed from queue, failed to send mail : nack' , 'notification')
                        channel.nack(message)
                    })                    
                }catch(err){
                    console.log('err : ' , err)
                    customLogger.error(`nack : ${err}` , 'notification')
                    channel.nack(message)   // failed to parse the message
                }
            }
        } , {noAck : false})
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'notification')
    }
}

consumeTicket()