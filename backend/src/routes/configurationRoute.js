import express from "express"
import configurationController from "../controllers/configurationController";
const router = express.Router();


router.get("/", configurationController.getCurrentSchoolYear);
router.post("/", configurationController.updateCurrentSchoolYear);

module.exports = router;