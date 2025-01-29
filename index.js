import express from "express";
import path from "path";
import router from "./routes/user.js";

import { ConnectMongoDb } from "./connections/connections.js";
import cookieParser from "cookie-parser";
import { ValidateAuthenticationAndCookie } from "./middlewares/auth.js";
const app = express();
const PORT = process.env.PORT || 9000;

import BlogsRoute from "./routes/blogs.js";
import { blog } from "./models/blogs.js";
ConnectMongoDb("mongodb://localhost:27017/blog")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((e) => console.log("Error connecting", e));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(ValidateAuthenticationAndCookie("token"));
app.use("/user", router);
app.use("/newblogs", BlogsRoute);
app.use(express.static(path.resolve("./public"))); //This is used for Rendering images as express won't allow dynamic rendering we have to mention explicitly
app.set("view engine", "ejs");
app.set("views", path.resolve("./views/"));
app.get("/", async (req, res) => {
  const allblogs = await blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allblogs,
  });
});

app.listen(PORT, () => {
  console.log(`Sever Started at ${PORT}`);
});
