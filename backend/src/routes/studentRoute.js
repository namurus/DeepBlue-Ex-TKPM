import express from "express";
const router = express.Router();

import studentController from "../controllers/studentController";
import validateRegistration from "../middlewares/emailDomainValidate";

router.get("/", studentController.getAllStudents);
router.post("/", validateRegistration, studentController.createStudent);
router.post("/delete-student", studentController.deleteStudent);
router.post("/update-student", studentController.updateStudent);

module.exports = router;