import { Router } from "express";
const router = Router();
import multer from "multer";
import { upload } from "../middlewares/multer.js";
import { blog } from "../models/blogs.js";
router
  .get("/add-new-blog", (req, res) => {
    res.render("addblogs", {
      user: req.user,
    });
  })
  .post("/add-new-blog", upload.single("CoverImage"), async (req, res) => {
    const { Title, Body } = req.body;
    const CreateBlog = await blog.create({
      Title,
      Body,
      CoverImage: `/uploads/${req.file.filename}`,
      CreatedBy: req.user._id,
    });
    console.log(CreateBlog);
    // return res.render("Card", {
    //   CoverImage: `../public/uploads/${req.file.filename}`,
    // });
    // return res.redirect(`/CreateBlog/${CreateBlog._id}`);
    return res.redirect("/");
  });
export default router;
