const express = require("express");
const router = express.Router("express");
const multer = require("multer");
const Facebook = require("../models/facebook");

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


module.exports = router;
