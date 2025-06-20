const GradeRepository = require('../repositories/grade.repository');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

async function addGrade(gradeData) {
    try {
        return await GradeRepository.create(gradeData);
    } catch (error) {
        console.error('Error adding grade:', error);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error adding grade', error);
    }
}

async function getGradesByStudentId(studentId) {
    try {
        return await GradeRepository.findByStudentId(studentId);
    } catch (error) {
        console.error('Error fetching grades:', error);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching grades', error);
    }
}

module.exports = {
    addGrade,
    getGradesByStudentId,
};
