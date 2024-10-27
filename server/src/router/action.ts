import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { availableAction } from "../controller/action";

const router = Router();

router.get("/available", availableAction);

export const actionRouter = router;
