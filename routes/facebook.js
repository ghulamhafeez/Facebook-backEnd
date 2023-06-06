const express = require("express");
const router = express.Router("express");
const Facebook = require("../models/facebook");


// Creating One
router.post("/", (req, res) => {
  console.log("param", req.body, res.body);

  const data = { name: req.body.name };

  var myData = new Facebook(data);
  myData
    .save()
    .then((item) => {
      res?.send("item saved to database");
    })
    .catch((err) => {
      console.log("err", err);
      res?.status(400).send("unable to save to database");
    });
});

router.get("/",  async (req, res) => {

  const data = await Facebook.find({});
  res.send(data);

});

module.exports = router;
