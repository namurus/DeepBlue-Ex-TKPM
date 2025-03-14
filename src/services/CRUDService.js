const Student = require('../models/student.model');

const findStudents = async (studentId) => {
    try {
        const student = await
            Student.find({ studentId: studentId });
        return student;
    }
    catch (error) {
        console.error('Error fetching student:', error);
        throw error;
    }
}

const getAllStudents = async () => {
    try {
        const students = await Student.find({});
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

const deleteStudent = async (studentId) => {
    try {
        const student = await Student.findOneAndDelete({ studentId: studentId });
    }
    catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
}

const updateStudent = async (student) => {
    try {
        const studentId = student.studentId;
        const updatedStudent = await Student.findOneAndUpdate({ studentId: studentId }, student, { new: true });

        return updatedStudent;
    }
    catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
}

module.exports = {
    getAllStudents: getAllStudents,
    createStudent: createStudent,
    deleteStudent: deleteStudent,
    findStudents: findStudents,
    updateStudent: updateStudent
};