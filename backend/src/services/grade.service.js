const Grade = require('../models/grade.model');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

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
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error adding grade');
    }
}

async function getGradesByStudentId(studentId) {
    try {
        const grades = await Grade.find({ studentId: studentId });
        return grades;

    } catch (error) {
        console.error('Error fetching grades:', error);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching grades');
    }
}

module.exports = {
    addGrade,
    getGradesByStudentId,
};

