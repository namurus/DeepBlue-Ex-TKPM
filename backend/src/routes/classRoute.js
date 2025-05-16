import express from "express";
import classController from "../controllers/classController";
const router = express.Router();

router.get("/", classController.getAllClasses);
router.post("/", classController.createClass);
router.post("/add-student", classController.addStudentToClass);

module.exports = router;