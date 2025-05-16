const Grade = require('../models/grade.model');

async function addGrade(gradeData) {
    try {
        const newGrade = await Grade.create({
            studentId: gradeData.studentId,
            courseCode: gradeData.courseCode,
            courseName: gradeData.courseName,
            grade: gradeData.grade,
            status: gradeData.status
        });
        return newGrade;
    } catch (error) {
        console.error('Error adding grade:', error);
        throw error;
    }
}

async function getGradesByStudentId(studentId) {
    try {
        const grades = await Grade.find({ studentId: studentId });
        return grades;

    } catch (error) {
        console.error('Error fetching grades:', error);
        throw error;
    }
}

module.exports = {
    addGrade,
    getGradesByStudentId,
};

