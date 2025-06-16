import express from "express"
import configurationController from "../controllers/configuration.controller";
const router = express.Router();


router.get("/", configurationController.getCurrentSchoolYear);
router.post("/", configurationController.updateCurrentSchoolYear);

module.exports = router;