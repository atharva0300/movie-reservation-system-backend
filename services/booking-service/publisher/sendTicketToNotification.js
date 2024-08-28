const amqp = require('amqplib')

// logger
const {logger : customLogger} = require('../logger/logger.config.js')

// import routing information
const {EXCHANGE_NAME, TICKET_NOTIFICAITON_QUEUE, TICKET_NOTIFICATION_ROUTING_KEY} = require('../config/rabbitmq.config.js')

const sendTicketToNotification = async(ticket) =>{
    try{
        const connection = await amqp.connect(`amqp://${process.env.RABBITMQ_DOCKER_HOST}:${process.env.RABBITMQ_DOCKER_PORT}`)
        const channel = await connection.createChannel()
        channel.assertExchange(EXCHANGE_NAME , 'topic',  {durable : true})
        channel.assertQueue(TICKET_NOTIFICAITON_QUEUE , {durable : true})
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

