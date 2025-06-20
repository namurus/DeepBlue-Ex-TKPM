import express from "express";
import multer from 'multer';

import studentController from "../controllers/student.controller";
import validateRegistration from "../middlewares/emailDomainValidate.middleware";
import uploadFileMiddleware from "../middlewares/uploadFile";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage:storage });


router.get("/", studentController.getAllStudents);
router.post("/", validateRegistration, studentController.createStudent);
router.post("/delete-student/:studentId", studentController.deleteStudent);
router.post("/update-student", studentController.updateStudent);
router.post("/upload",upload.single('file'), uploadFileMiddleware);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: List of students
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created
 */

/**
 * @swagger
 * /delete-student/{studentId}:
 *   post:
 *     summary: Delete a student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted
 */

/**
 * @swagger
 * /update-student:
 *   post:
 *     summary: Update a student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded
 */