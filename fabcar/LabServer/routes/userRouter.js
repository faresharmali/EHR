const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");

// router.get("/", assetController.getallAssets);
// router.get("/:patientID", assetController.getOneAssets);

//router.get("/", isAuth.isAdmin, userController.getAllUsers);

router.get("/:email", isAuth.isAdmin, userController.getOneUser);
//router.post("/", isAuth.isAdmin, userController.createUser);
//router.delete("/", isAuth.isAdmin, userController.deleteUser);
router.put("/", isAuth.isOwner, userController.updateUser);

// router.put("/aprove/:id", isAuth.isAdmin, assetController.updateassets);

// router.put("/aprove/:id", isAuth.isAdmin, assetController.updateassets);

module.exports = router;
