const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");

// router.get("/", assetController.getallAssets);
// router.get("/:patientID", assetController.getOneAssets);

router.get("/", userController.getAllUsers);
router.get("/doctors", userController.getAllDoctors);
router.get("/:email", userController.getOneUser);
router.post("/", userController.createUser);
router.delete("/", userController.deleteUser);
router.put("/", userController.updateUser);
router.post("/giveAccess", userController.giveAcces);
router.post("/revokeAccess", userController.revokeAcces);
router.post("/checkhash", userController.checkHash);




// router.put("/aprove/:id", isAuth.isAdmin, assetController.updateassets);

// router.put("/aprove/:id", isAuth.isAdmin, assetController.updateassets);

module.exports = router;
