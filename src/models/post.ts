import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: {
      type: String,
      default:
        "https://st2.depositphotos.com/2890953/11413/i/450/depositphotos_114138612-stock-photo-concept-of-blog-business.jpg",
    },
    authorDetails: {
      type: {
        fullName: String,
        email: String,
      },
      required: true,
    },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
