const express = require("express");
const router = express.Router("express");
const multer = require("multer");
const Facebook = require("../models/facebook");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Called1",file)
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log("Called2",file)
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
});

// var multerConfig = multer.diskStorage({

//   destination: (req,file,callback )=>{
//     callback(null ,'public/');
//   },
//   filename: (req,file,callback )=>{
//   const ext =file.mimetype.split('/')[1];
//   callback(null ,`image-${Date.now()}.${ext}`);
//   }
//   })
//   const isImage = (req,file,callback )=>{
//     if(file.mimetype.startsWith('image')){
//       callback(null ,true);
//     }else{
//       callback(new Error("ERROR"));
//     }
//   }

//   const upload = multer({
//     storage:multerConfig,
//     fileFilter:isImage
//   })

// Creating One
router.post("/", upload.single("file"), (req, res) => {
  console.log('Boyd', req.body)
  console.log("name", req.body);
  console.log("Flie", req.file);
  console.log("name", req.body.name);
  const url = req.protocol + "://" + req.get("host");

  const data = {
    name: req.body.name,
    file: url + "public/" + req.body.file.filename,
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

router.get("/", async (req, res) => {
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
