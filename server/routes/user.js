import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already registered." });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  await newUser.save();
  return res.json({ status: true, message: "Registered Successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" });
  }
  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "Login Successfully" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered" });
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "xyz@gmail.com",
        pass: "app Pass",
      },
    });

    var mailOptions = {
      from: "xyz@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "Error while sending mail" });
      } else {
        return res.json({ message: "Mail sent successfully" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post('/reset-password/:token', async (req,res) => {
    const {token} = req.params.token;
    const {password} = req.body;
    try{
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({_id: id}, {password: hashPassword})
        return res.json({status:true, message: "Password reset successfully"})
    }catch(err){
        return res.json("Invalid token")
    }
})

const verifyUser = async (req,res,next) => {
    try{
        const token = req.cookie.token;
        if(!token){
            return res.json({status: false, message: "No token"})
        }
        const decoded = await jwt.verify(token, process.env.KEY);
        next()
    }catch(err){
        return res.json(err)
    }
};

router.get('/verify',verifyUser, (req,res) => {
    return res.json({status: true, message: "Authorized"})
})

router.get('/logout', (req,res) => {
    res.clearCookie('token')
    return res.json({status: true})
})

export { router as UserRouter };
