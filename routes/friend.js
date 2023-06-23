const express = require("express");
const router = express.Router("express");
const Friend = require("../models/friend"); 
 
 // Add Friend
 
 router.post("/", (req, res) => {
    console.log("req",  req.body ,req.body.userName);
  
    const data = {
        userName: req.body.userName,
      };

    var myData = new Friend(data);
    myData
      .save()
      .then((item) => {
        res?.send("User successfully save");
      })
      .catch((err) => {
        res?.status(400).send("Unable to save");
      });
  });

  module.exports = router;