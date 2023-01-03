const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//const auth = require("./middileware/authenticate");
require("../db/db");
const User = require("../model/userSchema");

router.post("/signup", async (req, res) => {
  const { email, password, cpassword } = req.body;
  if (!email || !password || !cpassword) {
    res.status(422).json({
      error: "please filed properly Data",
    });
  }
  try {
    const userExist = await User.findOne({
      email: email,
    });
    if (userExist) {
      res.status(422).json({
        error: "email allready exist",
      });
    } else if (password != cpassword) {
      res.status(422).json({
        error: "password does not match",
      });
    } else {
      const user = new User({
        email,
        password,
        cpassword,
      });
      const userSignup = await user.save();
      if (userSignup) {
        res.status(201).json({
          message: "user registration successfully",
        });
      } else {
        res.status(500).json({
          message: "user registration UnSuccessfully",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

//signin

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.staus(422).json({
      message: "please filled properly",
    });
  }
  try {
    const userfind = await User.findOne({
      email: email,
    });

    if (userfind) {
      const isMatch = await bcrypt.compare(password, userfind.password);
      const token = await userfind.gernateAuthtoken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(422).json({
          error: "invalid Credentials",
        });
      } else {
        res.json({
          message: "user login",
        });
      }
    } else {
      res.status(400).json({
        error: "invalid Credentials",
      });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
