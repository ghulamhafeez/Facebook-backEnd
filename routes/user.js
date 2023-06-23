const express = require("express");
const router = express.Router("express");
const User = require("../models/user");

// Get All User
router.get("/", async (req, res) => {
    const data = await User.find({});
    res.send(data);
  });

// Delete User
router.delete("/:id", (req, res) => {
    console.log('params.id', req.params.id)
    User.deleteOne({ _id: req.params.id })
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
      const user = await User.findOne({ email : req.body.email });
      console.log("user ", user);
      if (user) {
        const result = req.body.password === user.password;
        console.log("result",result)
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