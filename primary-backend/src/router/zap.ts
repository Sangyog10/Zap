import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createZap, getAllZaps, getZap } from "../controller/zap";

const router = Router();

router.post("/", authMiddleware, createZap);

router.get("/", authMiddleware, getAllZaps);

router.get("/:zapId", authMiddleware, getZap);

export const zapRouter = router;
