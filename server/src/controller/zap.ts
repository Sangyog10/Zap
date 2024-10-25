import { prismaClient } from "../db";
import { ZapcreateSchema } from "../types";
import { Request, Response } from "express";

export const createZap = async (req: Request, res: Response): Promise<any> => {
  const body = req.body;
  //@ts-ignore
  const id = req.id;
  const parsedData = ZapcreateSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({ message: "Provide correct inputs" });
  }

  //create a zap
  const ZapId = await prismaClient.$transaction(async (tx) => {
    const zap = await prismaClient.zap.create({
      data: {
        userId: parseInt(id),
        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((x, index) => ({
            actionId: x.AvailableActionId,
            sortingOrder: index,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        triggerId: parsedData.data.AvailableTriggerId,
        zapId: zap.id,
      },
    });

    await prismaClient.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });
    return zap.id;
  });
  return res.json({ ZapId });
};

export const getAllZaps = async (req: Request, res: Response): Promise<any> => {
  //@ts-ignore
  const id = req.id;
  const zaps = await prismaClient.zap.findMany({
    where: {
      id: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });
  res.json({ zaps });
};

export const getZap = async (req: Request, res: Response): Promise<any> => {
  //@ts-ignore
  const id = req.id;
  const zapId = req.params.zapId;
  const zap = await prismaClient.zap.findFirst({
    where: {
      id: zapId,
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });
  res.json({ zap });
};
