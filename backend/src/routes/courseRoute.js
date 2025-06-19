import express from "express"
const router = express.Router();

import courseController from "../controllers/course.controller";

router.get("/", courseController.getAllCourses);
router.post("/", courseController.addCourse);


module.exports = router;