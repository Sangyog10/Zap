"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authMiddleware, (req, res) => {
    console.log("creat xap");
});
router.get("/", authMiddleware_1.authMiddleware, (req, res) => {
    console.log("all");
});
router.get("/:zapId", authMiddleware_1.authMiddleware, (req, res) => {
    console.log("all");
});
exports.zapRouter = router;
