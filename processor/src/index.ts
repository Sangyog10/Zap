//the work of this process is to pull things from outbox(zapRunOutbox) and push it to the kafka queue
import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const client = new PrismaClient();

const TOPIC_NAME = "zap-events"; //topic created for kafka via terminal

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    //retriving value from outbox
    const pendingRows = await client.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    //sending to kafka queue
    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r) => {
        return { value: r.zapRunId };
      }),
    });

    //deleting after sending from queue
    await client.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((r) => r.id),
        },
      },
    });
  }
}

main();

//39
