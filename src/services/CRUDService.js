const Student = require('../models/student.model');

const getAllStudents = async () => {
    try {
        const students = await Student.findAll();
        return students;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

const createStudent = async (student) => {
    try {
        const newStudent = await Student.create(student);
        return newStudent;
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
}

module.exports = {
    getAllStudents: getAllStudents,
    createStudent: createStudent,
};