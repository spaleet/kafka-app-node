# Kafka App Node
Simple Messaging application built with nodejs and kafka

## Installation

Clone the project source:
```bash
git clone https://github.com/spaleet/node-messaging-kafka
cd node-messaging-kafka/
```

Start the containers:
```bash
docker-compose up -d
```

After that enter in consumer & producer folder and install packages:
```bash
npm install
```

## Usage

Start producer:
```bash
cd /producer
npm start
```
And finally start consumer:
```bash
cd /consumer
npm start
```
