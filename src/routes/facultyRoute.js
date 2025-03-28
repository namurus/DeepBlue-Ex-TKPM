import express from "express"
const router = express.Router();

import facultyController from "../controllers/facultyController";

// router.get("/", facultyController.displayFaculty);
router.post("/", facultyController.createFaculty);
router.post("/update/:id", facultyController.updateFaculty);

module.exports = router;