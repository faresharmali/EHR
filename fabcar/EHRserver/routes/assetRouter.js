const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");
const isAuth = require("../middleware/isAuth");

router.get("/", assetController.getallAssets);
router.get("/:patientID" /*, isAuth.isOwner*/, assetController.getOneAssets);

//router.post("/exist/:assetID", assetController.assetExists);

router.post("/", assetController.postAsset);
router.delete("/:patientID", isAuth.isAdmin, assetController.deleteAsset);
router.put("/:patientID", /*, isAuth.isOwner*/assetController.updateAsset);
// router.delete("/m/:patientID", assetController.deleteDocFromRecord);
router.get("/hest/:patientID", assetController.getAssetHistory);

// router.put("/aprove/:id", isAuth.isAdmin, assetController.updateassets);

module.exports = router;
