const { Kafka } = require('kafkajs')

const config = {
    topic: "my-topic",
    host: "localhost:9092"
}

const kafka = new Kafka({
    clientId: "my-consumer",
    brokers: [config.host]
})

const consumer = kafka.consumer({ groupId: `${config.topic}-group-1` })

const run = async () => {

    await consumer.connect()
    await consumer.subscribe({ topic: config.topic, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })

            console.log("Message Value : ", message.value.toString());
        },
    })
}

run().catch(console.error)