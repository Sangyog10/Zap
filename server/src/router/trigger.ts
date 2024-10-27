import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { availableTrigger } from "../controller/trigger";

const router = Router();

router.get("/available", availableTrigger);

export const triggerRotuter = router;
