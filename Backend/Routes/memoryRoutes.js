import express from "express";
import { addMemory, downloadMemory } from "../Controllers/memoryControllers.js";
import { uploadMiddleware } from "../middleware/multer.js"
import { cookieAuthJwt } from "../middleware/authJwt.js";
const router = express.Router();

router.post("/addMemory", cookieAuthJwt, uploadMiddleware, addMemory);
router.get("/getMemory/:key", downloadMemory);

export default router;