import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, (req, res) => {
  console.log("creat xap");
});

router.get("/", authMiddleware, (req, res) => {
  console.log("all");
});

router.get("/:zapId", authMiddleware, (req, res) => {
  console.log("all");
});

export const zapRouter = router;
