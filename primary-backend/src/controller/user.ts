import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { Request, Response } from "express";

export const singupController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({ message: "Incorrect Input" });
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    return res.status(403).json({ message: "User already exists" });
  }

  await prismaClient.user.create({
    data: {
      email: parsedData.data.username,
      //hash the password before saving
      password: parsedData.data.password,
      name: parsedData.data.name,
    },
  });
  //verify your email
  //await sendEmail()
  return res.json({ message: "Please verify your account" });
};

export const signinController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({ message: "Incorrect Input" });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD
  );

  res.json({
    token: token,
  });
};

export const getUser = async (req: Request, res: Response): Promise<any> => {
  //TODO:fix the id : req.id
  //@ts-ignore
  const id = req.id;
  const user = await prismaClient.user.findFirst({
    where: {
      id: id,
    },
    select: {
      name: true,
      email: true,
    },
  });
  return res.json({ user });
};
