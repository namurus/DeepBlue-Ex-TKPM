import express from "express";
const router = express.Router();

import classController from "../controllers/classController";

router.get("/", classController.getAllClasses);
router.post("/", classController.createClass);
router.post("/add-student", classController.addStudentToClass);

module.exports = router;