import { Schema, model } from "mongoose";
import { string } from "zod";
// import { bcrypt } from "bcrypt";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    FullName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    Role: {
      type: String,
      enum: ["USER", "ADMIN"],
    },
  },
  { timestamps: true },
);
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const hashedPassword = bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  console.log(hashedPassword);
  console.log(this.password);
  next();
});
const User = model("User", UserSchema);
export default User;
