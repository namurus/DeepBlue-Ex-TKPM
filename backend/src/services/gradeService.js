const Grade = require('../models/grade.model');

async function getGradesByStudentId(studentId) {
    try {
        const grades = await Grade.findAll({
            where: { studentId },
            attributes: ['courseId', 'grade'],
            include: [{
                model: require('../models/course.model'),
                as: 'course',
                attributes: ['name'],
            }],
        });

        return grades.map(grade => ({
            courseId: grade.courseId,
            grade: grade.grade,
            courseName: grade.course ? grade.course.name : null,
        }));
    } catch (error) {
        console.error('Error fetching grades:', error);
        throw error;
    }
}

module.exports = {
};

