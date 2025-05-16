import GradeService from '../services/gradeService.js';

let addGrade = async (req, res) => {
    try {
        const newGrade = await GradeService.addGrade(req.body);
        return res.status(200).json(newGrade);
    } catch (error) {
        console.error('Error adding grade:', error);
        return res.status(500).json({ message: 'Error adding grade', error: error.message });
    }
}

let getGradesByStudentId = async (req, res) => {
    try {
        const grades = await GradeService.getGradesByStudentId(req.query.studentId);
        return res.status(200).json(grades);
    } catch (error) {
        console.error('Error fetching grades:', error);
        return res.status(500).json({ message: 'Error fetching grades', error: error.message });
    }
}

module.exports = {
    addGrade,
    getGradesByStudentId,
}