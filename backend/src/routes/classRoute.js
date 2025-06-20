import express from "express";
import classController from "../controllers/class.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Quản lý lớp học
 */

/**
 * @swagger
 * /api/classes:
 *   get:
 *     summary: Lấy danh sách tất cả lớp học
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: Thành công. Trả về danh sách lớp học
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */
router.get("/", classController.getAllClasses);

/**
 * @swagger
 * /api/classes:
 *   post:
 *     summary: Tạo lớp học mới
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Lớp học đã được tạo
 */
router.post("/", classController.createClass);

/**
 * @swagger
 * /api/classes/add-student:
 *   post:
 *     summary: Thêm sinh viên vào lớp
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - classId
 *               - studentId
 *             properties:
 *               classId:
 *                 type: string
 *                 description: ID của lớp học
 *               studentId:
 *                 type: string
 *                 description: ID của sinh viên
 *     responses:
 *       200:
 *         description: Thêm sinh viên thành công
 */
router.post("/add-student", classController.addStudentToClass);

module.exports = router;
