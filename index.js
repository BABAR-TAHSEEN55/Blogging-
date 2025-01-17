import express from "express";
import path from "path";
import router from "./routes/user.js";
const app = express();
const PORT = process.env.PORT || 9000;

import { ConnectMongoDb } from "./connections/connections.js";
ConnectMongoDb("mongodb://localhost:27017/blog")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((e) => console.log("Error connecting"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views/"));
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/user", router);
app.listen(PORT, () => {
  console.log(`Sever Started at ${PORT}`);
});
