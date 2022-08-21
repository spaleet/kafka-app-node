const kafka = require('kafka-node');

exports.getProducer = () => {
    const client = new kafka.KafkaClient({
        kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS
    });
    
    const producer = new kafka.Producer(client);

    producer.on('error', (err) => {
        console.log("ERROR : ", err);
    })

    return producer
}