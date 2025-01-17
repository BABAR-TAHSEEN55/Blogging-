import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";
import User from "../models/Users.js";
router
  .post("/signin", async (req, res) => {
    const { Email, password } = req.body;
    if (!Email || !password)
      return res.json({ message: "Email or Password is required " });
    const user = await User.findOne({ Email });
    const isMatch = bcrypt.compare(password, user.password);
    isMatch
      ? console.log("Password is Correct")
      : console.log("Password is Incorrect");
    res.redirect("/pass");
  })
  .get("/signup", (req, res) => {
    return res.render("signup");
  })
  .post("/signup", async (req, res) => {
    const { FullName, Email, password } = req.body;
    if ((!(Email || password) === null) | undefined)
      return res.json({ message: "INVALID " });
    await User.create({
      FullName,
      Email,
      password,
    });

    return res.redirect("/");
  })
  .get("/signin", (req, res) => {
    res.render("signin");
  });

export default router;
