import { Schema, model } from "mongoose";

const BlogSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Body: {
      type: String,
      required: true,
    },
    CoverImage: {
      type: String,
      required: true,
    },
    CreatedBy: {
      type: Schema.types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const blog = model("blog", BlogSchema);
export { blog };
