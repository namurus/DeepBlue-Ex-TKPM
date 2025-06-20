import express from 'express';
import gradeController from '../controllers/grade.controller';
import exportTranscriptPDF from '../middlewares/exportPDF';

const router = express.Router();
// Route to get all grades
router.post('/', gradeController.addGrade);

router.get('/', gradeController.getGradesByStudentId);

router.get('/export', exportTranscriptPDF.exportTranscriptPDF);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: Grade management
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new grade
 *     tags: [Grades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *               subject:
 *                 type: string
 *               grade:
 *                 type: number
 *     responses:
 *       201:
 *         description: Grade added successfully
 *       400:
 *         description: Invalid input
 *   get:
 *     summary: Get grades by student ID
 *     tags: [Grades]
 *     parameters:
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *     responses:
 *       200:
 *         description: List of grades
 *       404:
 *         description: Grades not found
 */

/**
 * @swagger
 * /export:
 *   get:
 *     summary: Export transcript as PDF
 *     tags: [Grades]
 *     parameters:
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The student ID
 *     responses:
 *       200:
 *         description: PDF exported successfully
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Transcript not found
 */