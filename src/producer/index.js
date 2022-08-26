const { Kafka } = require('kafkajs')

const config = {
    topic: "my-topic",
    host: "localhost:9092"
}

const kafka = new Kafka({
    clientId: "my-producer",
    brokers: [config.host]
});

const producer = kafka.producer()

const run = async () => {

    await producer.connect()
    let current = 1;

    setInterval(async () => {

        await producer.send({
            topic: config.topic,
            messages: [
                { value: `Message from producer : Current is ${current}` },
            ],
        });

        current += 1;
        console.log("message sent !");
    }, 5000);
}

run().catch(console.error)