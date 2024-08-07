const express = require('express')
const dotenv = require('dotenv')
const path =  require('path')
dotenv.config({path : path.resolve(__dirname , '../../../.env')})
const amqp = require('amqplib')

// logger
const {logger : customLogger} = require('../../../logs/logger/logger.config')

// import routing information
const {EXCHANGE_NAME, TICKET_NOTIFICAITON_QUEUE, TICKET_NOTIFICATION_ROUTING_KEY} = require('../config/rabbitmq.config.js')

const sendTicketToNotification = async(ticket) =>{
    console.log('inside send ticket to notification')
    try{
        const connection = await amqp.connect(`amqp://localhost:${process.env.DOCKER_RABBITMQ_PORT}`)
        const channel = await connection.createChannel()
        channel.assertExchange(EXCHANGE_NAME , 'topic',  {durable : true})
        channel.assertQueue(TICKET_NOTIFICAITON_QUEUE , {durable : true})
        console.log('binding')
        channel.bindQueue(TICKET_NOTIFICAITON_QUEUE , EXCHANGE_NAME , TICKET_NOTIFICATION_ROUTING_KEY)
        channel.publish(EXCHANGE_NAME , TICKET_NOTIFICATION_ROUTING_KEY , Buffer.from(JSON.stringify(ticket)))

        // Properly close the channel and connection on process exit
        process.on('exit', async () => {
            if (channel) {
                await channel.close();
            }
            if (connection) {
                await connection.close();
            }
        });
        customLogger.info('ticket published to queue' , 'booking')
        return true
    }catch(err){
        console.log('err : ' , err)
        customLogger.error(err , 'booking')
        return err
    }
}

module.exports = {sendTicketToNotification}

