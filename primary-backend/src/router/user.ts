import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup", (req, res) => {
  console.log("signup");
});

router.get("/signin", (req, res) => {
  console.log("signup");
});

router.get("/user", authMiddleware, (req, res) => {
  console.log("usr");
});

export const userRouter = router;
