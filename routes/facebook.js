const express = require("express");
const router = express.Router("express");
const multer = require("multer");
const Facebook = require("../models/facebook");
const User = require("../models/facebook");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { check, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: "./public/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// Creating One
router.post("/", upload.single("file"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");

  const data = {
    name: req.body.name,
    file: url + "/public/" + req?.file?.originalname,
  };

  var myData = new Facebook(data);
  myData
    .save()
    .then((item) => {
      res?.send("item saved to database");
    })
    .catch((err) => {
      res?.status(400).send("unable to save to database");
    });
});

// Get All
router.get("/", async (req, res) => {
  const data = await Facebook.find({});
  res.send(data);
});

// Delete One
router.delete("/:id", (req, res) => {
  Facebook.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

// Update One
router.put("/:id", (req, res) => {
  const newData = new Facebook({
    _id: req.params.id,
    name: req.body.name,
  });
  Facebook.updateOne({ _id: req.params.id }, newData).then(() => {
    res.status(201).json({
      message: "Updated successfully!",
    });
  });
});

// SignUp
router.post("/signup", async (req, res) => {
  console.log("req", req, req.body);

  const user = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  return res.status(200).json(user);
  // var myData = new Facebook(user);
  // myData
  //   .save()
  //   .then((item) => {
  //     res?.send("User successfully SignUp");
  //   })
  //   .catch((err) => {
  //     res?.status(400).send("Unable to SignUp");
  //   });
});

// LogIn

router.post("/login", async (req, res) => {
  console.log("req ", req, req.body);
  try {
    const user = await User.findOne({ userName: req.body.userName });
    console.log("req ", user, req.body);
    if (user) {
      const result = req.body.password === user.password;
      if (result) {
        res.render("secret");
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
