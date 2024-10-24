//this will take works from queue and process them
// import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

// const client = new PrismaClient();

const TOPIC_NAME = "zap-events"; //topic created for kafka via terminal

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();

  while (true) {
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        });
        //complete the process
        await new Promise((r) => setTimeout(r, 500));

        //notify the kafka that the process is done
        await consumer.commitOffsets([
          {
            topic: TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString(), //if process dies in middle, it will get the next process to do the works
          },
        ]);
      },
    });
  }
}

main();
