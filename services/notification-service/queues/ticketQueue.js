const amqplib = require('amqplib')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path : path.resolve(__dirname , '../../.env')})

const sendTicketToQueue = async(ticket) => {
    console.log('inside sendTicketto queue')
    const connection = await amqplib.connect(process.env.RABBITMQ_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(process.env.TICKET_QUEUE)

    channel.sendToQueue(process.env.TICKET_QUEUE , Buffer.from(JSON.stringify(ticket)))

    console.log('Ticket sent to the queue : ' , ticket)

    await channel.close();
    await connection.close();
}


module.exports = sendTicketToQueue