import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Post from "../models/post";
import User from "../models/user";

interface MyRequest extends Request {
  user?: any;
}

const createPost = async (req: MyRequest, res: Response) => {
  try {
    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const existingPost = await Post.findOne({ title: req.body.title });
    if (existingPost) {
      return res
        .status(400)
        .json({ message: "A post with this title already exists." });
    }

    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const author = await User.findById(req.body.author); // Fetch the User document
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newPost = new Post({
      ...req.body,
      slug,
      author: req.body.author,
      authorDetails: {
        fullName: author.fullName,
        email: author.email,
      },
      imageUrl,
    });

    try {
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Failed to save post" });
    }
  } catch (err : any) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const query = {};

    const posts = await Post.find(query)
      .populate("author") // Ensure this matches the 'ref' in your schema
      .sort({ lastUpdated: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Post.countDocuments(query);

    const response = {
      data: posts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getPostsByAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const query = { author: authorId };

    const posts = await Post.find(query)
      .sort({ lastUpdated: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Post.countDocuments(query);

    const response = {
      data: posts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export default {
  createPost,
  getPosts,
  getPostsByAuthor,
  getPostById
};
