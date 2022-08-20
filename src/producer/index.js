const kafka = require('kafka-node');

console.log("Starting App ...");

setTimeout(() => {

    const client = new kafka.KafkaClient({
        kafkaHost: "localhost:9092"
    });
    
    console.log("Starting Producer ...");

    const producer = new kafka.Producer(client);

    producer.on('ready', () => {

        const msg = JSON.stringify({ message: "Hello my only one!" })

        producer.send(
            [{ topic: "my_topic_1", messages: msg }],
            (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("message sent");
                }
            }
        )
    })

    producer.on('error', (err) => {
        console.log("ERROR : ", err);
    })
}, 10000)

