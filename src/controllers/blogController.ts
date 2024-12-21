import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { Blog } from "../models/Blog";
import { ApiError } from "../utils/ApiError";

export const createBlog = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({
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
        _id: blog?._id,
        title: blog?.title,
        content: blog?.content,
        author: blog?.author,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "Not authorized to update this blog");
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
        _id: blog?._id,
        title: blog?.title,
        content: blog?.content,
        author: blog?.author,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log("🚀 ~ id:", id);
    const blog = await Blog.findById(id);

    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    if (
      blog.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      throw new ApiError(403, "Not authorized to delete this blog");
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
      filter,
    } = req.query;

    let query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (filter) {
      query.author = filter;
    }

    const blogs = await Blog.find(query)
      .sort({ [sortBy as string]: sortOrder === "desc" ? -1 : 1 })
      .populate("author", "name email")
      .select("_id title content author");

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      statusCode: 200,
      data: blogs,
    });
  } catch (error) {
    next(error);
  }
};
