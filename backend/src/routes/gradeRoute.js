import express from 'express';
import gradeController from '../controllers/grade.controller';
import exportTranscriptPDF from '../middlewares/exportPDF';

const router = express.Router();
// Route to get all grades
router.post('/', gradeController.addGrade);

router.get('/', gradeController.getGradesByStudentId);

router.get('/export', exportTranscriptPDF.exportTranscriptPDF);

module.exports = router;