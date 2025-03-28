import express from "express"
const router = express.Router();

import facultyController from "../controllers/facultyController";

router.get("/get-faculty", facultyController.displayFaculty);
router.post("/create-faculty", facultyController.createFaculty);
router.post("/update-faculty/:id", facultyController.updateFaculty);