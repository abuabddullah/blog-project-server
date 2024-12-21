"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
const blog_validation_1 = require("../zodValidators/blog.validation");
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.auth, (0, validateRequest_1.default)(blog_validation_1.BlogValidation.createBlogValidationSchema), blogController_1.createBlog);
router.patch("/:id", auth_1.auth, (0, validateRequest_1.default)(blog_validation_1.BlogValidation.updateBlogValidationSchema), blogController_1.updateBlog);
router.delete("/:id", auth_1.auth, blogController_1.deleteBlog);
router.get("/", blogController_1.getBlogs);
exports.default = router;
