const express = require("express");
const router = express.Router();
const multer = require("../libs/multer");
const {
	uploadArt,
	getArt,
	getArtById,
	updateArt,
	deleteArt,
} = require("../controllers/artController");

router.post("/upload", multer.single("image"), uploadArt);

router.get("/", getArt);
router.get("/:artId", getArtById);

router.put("/:artId", multer.single("image"), updateArt);

router.delete("/:artId", deleteArt);

module.exports = router;
