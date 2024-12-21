"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const blogController_1 = require("../controllers/blogController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.patch("/users/:userId/block", auth_1.adminAuth, adminController_1.blockUser);
router.delete("/blogs/:id", auth_1.adminAuth, blogController_1.deleteBlog);
exports.default = router;
