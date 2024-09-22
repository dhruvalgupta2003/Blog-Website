import { Blog } from "../models/blog.model.js";
import {
  createBlogSchema,
  getBlogByIdSchema,
  updateBlogByIdSchema,
  deleteBlogSchema,
} from "../validation/blog.validation.js";

// handle zod errors
const handleZodError = (error) => {
  const errors = error.errors.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
  return { success: false, errors };
};
// create new blog
export const createBlog = async (req, res) => {
  const validatedData = createBlogSchema.parse(req.body);
  try {
    const blog = new Blog({
      validatedData,
    });
    await blog.save();
    return res
      .status(201)
      .json({
        success: true,
        message: "Blog created Successfully !!",
        blogId: blog._id,
      });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json(handleZodError(error));
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get single blog by id
export const getBlogById = async (req, res) => {
  const { blogId } = getBlogByIdSchema.parse(req.params);
  try {
    // check if blog exists
    const blog = await Blog.findById(blogId)
      .populate("creatorId", "name email")
      .lean();
    if (!blog) {
      return res.status(404).json("Blog not found..");
    }
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json(handleZodError(error));
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "-createdAt", search } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parent(limit, 10),
      sort,
      populate: { path: "creatorId", select: "name email" },
      lean: true,
    };
    let query = {};
    if (search) {
      query = { $text: { $search: search } };
    }
    const blogs = await Blog.paginate(query, options);
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json(handleZodError(error));
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// edit/ update blog
export const editBlogById = async (req, res) => {
  const { blogId, ...updateData } = updateBlogByIdSchema.parse(req.body);
  try {
    // check if blog exists
    const blog = await Blog.findByIdAndUpdate(blogId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      return res.status(404).json("Blog not found..");
    }
    return res
      .status(200)
      .json({
        success: false,
        message: "Blog Updated Successfully!!",
        data: blog,
      });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json(handleZodError(error));
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

// delete blog
export const deleteBlogById = async (req, res) => {
  const { blogId } = deleteBlogSchema.parse(req.params);
  try {
    // check if blog exists
    const blog = await Blog.findByIdAndDelete(blogId);
    if (!blog) {
      return res.status(404).json("Blog not found..");
    }
    return res
      .status(200)
      .json({ success: true, message: "Blog deleted Sucessfully!!" });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json(handleZodError(error));
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};
