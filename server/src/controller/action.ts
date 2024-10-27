import { Request, Response } from "express";
import { prismaClient } from "../db";

export const availableAction = async (
  req: Request,
  res: Response
): Promise<any> => {
  const actions = await prismaClient.availableAction.findMany({});
  return res.json({ actions });
};
