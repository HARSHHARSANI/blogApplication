import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    postedBy: {
      type: ObjectId,
      ref: "User",
    },

    comments: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
