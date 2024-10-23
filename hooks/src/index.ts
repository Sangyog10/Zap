import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

//webhook implemtation(i.e whenever we receive req from other services)
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  //transaction will make sure that both works get completed
  await client.$transaction(async (tx) => {
    //storing in db
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });
    // storing in  queue
    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  res.json({
    msg: "success",
  });
});

app.listen(3000);

//webhook is a hook that lets differnt platform send request to our system.
//eg, whenever someone comments in github, webhook will notify zapier about it if they are connected