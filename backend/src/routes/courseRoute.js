import express from "express"
const router = express.Router();

import courseController from "../controllers/course.controller";

router.get("/", courseController.getAllCourses);
router.post("/", courseController.addCourse);


module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *   post:
 *     summary: Add a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the course
 *         name:
 *           type: string
 *           description: The name of the course
 *         description:
 *           type: string
 *           description: The course description
 *       example:
 *         id: "1"
 *         name: "Introduction to Programming"
 *         description: "Learn the basics of programming."
 */