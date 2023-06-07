const express = require("express");
const router = express.Router("express");
const Facebook = require("../models/facebook");

// Creating One
router.post("/", (req, res) => {

  const data = { name: req.body.name };

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

router.get("/",  async (req, res) => {

  const data = await Facebook.find({});
  res.send(data);

});

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

module.exports = router;
