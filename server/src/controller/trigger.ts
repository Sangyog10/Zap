import { Request, Response } from "express";
import { prismaClient } from "../db";

export const availableTrigger = async (
  req: Request,
  res: Response
): Promise<any> => {
  const triggers = await prismaClient.availableTrigger.findMany({});
  return res.json({ triggers });
};
