import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  name: z.string().min(1),
});

export const SigninSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const ZapcreateSchema = z.object({
  AvailableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      AvailableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});
