import express from "express"
const router = express.Router();

import facultyController from "../controllers/faculty.controller";

router.post("/", facultyController.createFaculty);
router.post("/update/:id", facultyController.updateFaculty);

module.exports = router;