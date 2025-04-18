import express from "express"
const router = express.Router();

import courseController from "../controllers/courseController";

router.get("/", courseController.getAllCourses);
router.post("/", courseController.addCourse);


module.exports = router;