require('dotenv').config();
const express = require('express');
const kafka = require('kafka-node');

const app = express();

app.get("/health", (req, res) => {
    res.send("Healthy")
})

console.log("Starting App ...");

const client = new kafka.KafkaClient({
    kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS
});

// check if topic exists
client.loadMetadataForTopics([process.env.KAFKA_TOPIC], (err, resp) => {

    if (err) {
        console.log("ERROR : ", err);
    }
    else {

        console.log("Starting Consumer ...");

        const consumer = new kafka.Consumer(client, [{ topic: process.env.KAFKA_TOPIC }], {
            autoCommit: false,
            groupId: "user"
        });

        consumer.on('message', (message) => {

            console.log("Message received ", message);
            console.log(`Message received with ${message.key} key`);

            const messageValue = JSON.parse(message.value);
            console.log("Message Value : ", messageValue);
        });

        consumer.on('error', (err) => {
            console.log("ERROR : ", err);
        });

    }

});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App in running on http://localhost:${PORT}`)
})
