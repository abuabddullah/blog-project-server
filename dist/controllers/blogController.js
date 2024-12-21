"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogs = exports.deleteBlog = exports.updateBlog = exports.createBlog = void 0;
const Blog_1 = require("../models/Blog");
const ApiError_1 = require("../utils/ApiError");
const createBlog = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog_1.Blog.create({
            title,
            content,
            author: req.user._id,
        });
        /* populate the author from User collection */
        await blog.populate("author", "name email");
        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            statusCode: 201,
            data: {
                _id: blog === null || blog === void 0 ? void 0 : blog._id,
                title: blog === null || blog === void 0 ? void 0 : blog.title,
                content: blog === null || blog === void 0 ? void 0 : blog.content,
                author: blog === null || blog === void 0 ? void 0 : blog.author,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBlog = createBlog;
const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const blog = await Blog_1.Blog.findById(id);
        if (!blog) {
            throw new ApiError_1.ApiError(404, "Blog not found");
        }
        if (blog.author.toString() !== req.user._id.toString()) {
            throw new ApiError_1.ApiError(403, "Not authorized to update this blog");
        }
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        await blog.save();
        /* populate the author from User collection */
        await blog.populate("author", "name email");
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            statusCode: 200,
            data: {
                _id: blog === null || blog === void 0 ? void 0 : blog._id,
                title: blog === null || blog === void 0 ? void 0 : blog.title,
                content: blog === null || blog === void 0 ? void 0 : blog.content,
                author: blog === null || blog === void 0 ? void 0 : blog.author,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("🚀 ~ id:", id);
        const blog = await Blog_1.Blog.findById(id);
        if (!blog) {
            throw new ApiError_1.ApiError(404, "Blog not found");
        }
        if (blog.author.toString() !== req.user._id.toString() &&
            req.user.role !== "admin") {
            throw new ApiError_1.ApiError(403, "Not authorized to delete this blog");
        }
        await blog.deleteOne();
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBlog = deleteBlog;
const getBlogs = async (req, res, next) => {
    try {
        const { search, sortBy = "createdAt", sortOrder = "desc", filter, } = req.query;
        let query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
            ];
        }
        if (filter) {
            query.author = filter;
        }
        const blogs = await Blog_1.Blog.find(query)
            .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
            .populate("author", "name email")
            .select("_id title content author");
        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            statusCode: 200,
            data: blogs,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBlogs = getBlogs;
