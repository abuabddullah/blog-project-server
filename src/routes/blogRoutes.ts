import validateRequest from "../middleware/validateRequest";
import { BlogValidation } from "../zodValidators/blog.validation";
import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blogController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post(
  "/",
  auth,
  validateRequest(BlogValidation.createBlogValidationSchema),
  createBlog
);
router.patch(
  "/:id",
  auth,
  validateRequest(BlogValidation.updateBlogValidationSchema),
  updateBlog
);
router.delete("/:id", auth, deleteBlog);
router.get("/", getBlogs);

export default router;
