import { Router } from "express";
const router = Router();

router.get("/add-new-blog", (req, res) => {
  res.render("addblogs", {
    user: req.user,
  });
});

export default router;
