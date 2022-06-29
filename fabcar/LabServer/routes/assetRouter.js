const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const assetController = require("../controllers/assetController");
const isAuth = require("../middleware/isAuth");
const reqValidation = require("../middleware/reqValidation");
const fs = require("fs");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    var today = new Date();

    let date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    "-" +
    today.getMinutes();
    let ext=file.originalname.split(".").pop()
    cb(null, req.params.patientID+"-"+date + '.'+ext)
    req.fileName=req.params.patientID+"-"+date + '.'+ext

  },
});

const upload = multer({ storage: storage }).single("image");

router.get("/:patientID" /*, isAuth.isOwner*/, assetController.getOneAssets);
router.post("/:patientID", upload, assetController.updateAsset);

module.exports = router;
