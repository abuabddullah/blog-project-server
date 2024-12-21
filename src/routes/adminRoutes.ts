import express from "express";
import { blockUser } from "../controllers/adminController";
import { deleteBlog } from "../controllers/blogController";
import { adminAuth } from "../middleware/auth";

const router = express.Router();

router.patch("/users/:userId/block", adminAuth, blockUser);
router.delete("/blogs/:id", adminAuth, deleteBlog);

export default router;
