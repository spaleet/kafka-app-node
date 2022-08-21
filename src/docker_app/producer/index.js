require('dotenv').config();
const express = require('express');
const { getProducer } = require('./producer');

const app = express();
app.use(express.json());

app.post('/send', (req, res) => {

    if (!req.body || !req.body.message)
        return res.status(400).send("Please enter the message !");

    const producer = getProducer();

    producer.on('ready', () => {
        console.log("Producer Ready ...");

        const msg = JSON.stringify({ message: req.body.message })

        producer.send(
            [{ topic: process.env.KAFKA_TOPIC, messages: msg }],
            (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(`Error : ${err}`);
                } else {
                    console.log("Message sent!");
                    return res.status(200).send("Message sent!");
                }
            }
        )
    })

});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App in running on http://localhost:${PORT}`)
})