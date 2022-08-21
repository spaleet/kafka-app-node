const kafka = require('kafka-node');

console.log("Starting App ...");

setTimeout(() => {

    const client = new kafka.KafkaClient({
        kafkaHost: "localhost:9092"
    });
    
    console.log("Starting Consumer ...");

    const consumer = new kafka.Consumer(client, [{ topic: "my_topic_1" }], {
        autoCommit: false,
        groupId: "user"
    });

    consumer.on('message', (message) => {

        console.log("Messege received ", message);
        console.log(`Messege received with ${message.key} key`);

        const messageValue = JSON.parse(message.value);
        console.log("Message Value : ", messageValue);
    })

    consumer.on('error', (err) => {
        console.log("ERROR : ", err);
    })
}, 10000)

