import express from "express";
import path from "path";
import router from "./routes/user.js";
import { ConnectMongoDb } from "./connections/connections.js";
import cookieParser from "cookie-parser";
import { ValidateAuthenticationAndCookie } from "./middlewares/auth.js";
const app = express();
const PORT = process.env.PORT || 9000;

import BlogsRoute from "./routes/blogs.js";
ConnectMongoDb("mongodb://localhost:27017/blog")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((e) => console.log("Error connecting"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(ValidateAuthenticationAndCookie("token"));
app.use("/user", router);
app.use("/newblogs", BlogsRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views/"));
app.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Sever Started at ${PORT}`);
});
