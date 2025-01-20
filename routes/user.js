import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";
import { CreateToken, ValidateToken } from "../utils/authentication.js";
import User from "../models/Users.js";
router
  .post("/signin", async (req, res) => {
    const { Email, password } = req.body;
    if (!Email || !password)
      return res.json({ message: "Email or Password is required " });
    try {
      const user = await User.findOne({ Email });
      const isMatch = bcrypt.compare(password, user.password);
      console.log(isMatch);
      isMatch
        ? console.log("Password is Correct")
        : console.log("Password is Incorrect");

      if (isMatch) {
        const token = CreateToken(user);
        res.cookie("token", token).redirect("/");
      }
    } catch (error) {
      // console.log(error);

      res.render("signin", {
        error: "Incorrect Email or Password ",
      });
    }
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
