const Grade = require('../models/grade.model');

class GradeRepository {
    async create(gradeData) {
        return await Grade.create({
            studentId: gradeData.studentId,
            courseCode: gradeData.courseCode,
            courseName: gradeData.courseName,
            grade: gradeData.grade,
            status: gradeData.status
        });
    }

    async findByStudentId(studentId) {
        return await Grade.find({ studentId });
    }
}

module.exports = new GradeRepository();
