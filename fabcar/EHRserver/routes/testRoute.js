const express = require("express");
const router = express.Router();


// router.get("/", assetController.getallAssets);
// router.get("/:patientID", assetController.getOneAssets);

router.get("/", (req,res)=>{
    console.log("wazuup")
    res.sendStatus(200,"helo")
});


module.exports = router;
