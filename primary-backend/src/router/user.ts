import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { singupController } from "../controller/user";
import { signinController } from "../controller/user";
import { getUser } from "../controller/user";

const router = Router();

router.post("/signup", singupController);

router.post("/signin", signinController);

router.get("/", authMiddleware, getUser);

export const userRouter = router;
