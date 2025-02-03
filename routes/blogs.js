import { Router } from "express";
const router = Router();
import multer from "multer";
import { upload } from "../middlewares/multer.js";
import { blog } from "../models/blogs.js";

import { Comments } from "../models/Comments.js";
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
  })
  .get("/blog/:id", async (req, res) => {
    const Blog = await blog.findById(req.params.id).populate("CreatedBy");
    const comments = await Comments.find({ BlogId: req.params.id }).populate(
      "CreatedBy",
    );
    return res.render("blog", {
      user: req.user,
      blog: Blog,
      comment: comments,
    });
  })
  .post("/blog/comments/:BlogId", async (req, res) => {
    await Comments.create({
      Content: req.body.Content,
      BlogId: req.params.BlogId,
      CreatedBy: req.user._id,
    });

    return res.redirect(`/newblogs/blog/${req.params.BlogId}`);
  });

export default router;
