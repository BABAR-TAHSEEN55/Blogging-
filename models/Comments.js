import { Schema, model } from "mongoose";

const CommentsSchema = new Schema(
  {
    Content: {
      type: String,
    },
    CreatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    BlogId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
    },
  },
  { timestamps: true },
);

const Comments = model("Comments", CommentsSchema);
export { Comments };
