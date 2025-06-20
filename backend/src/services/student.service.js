import StudentRepository from '../repositories/student.repository';
import StudentStatusValidator from '../validators/studentStatus.validator';

const getAllStudents = async () => {
    try {
        return await StudentRepository.findAll();
    } catch (error) {
        throw error;
    }
};

const findStudentById = async (studentId) => {
    try {
        return await StudentRepository.findById(studentId);
    } catch (error) {
        throw error;
    }
};

const findStudentsByName = async (name) => {
    try {
        return await StudentRepository.findByName(name);
    } catch (error) {
        throw error;
    }
};

const findStudentsByFaculty = async (faculty) => {
    try {
        return await StudentRepository.findByFaculty(faculty);
    } catch (error) {
        throw error;
    }
};

const findStudentsByFacultyAndName = async (faculty, name) => {
    try {
        return await StudentRepository.findByFacultyAndName(faculty, name);
    } catch (error) {
        throw error;
    }
};

const createStudent = async (student) => {
    try {
        return await StudentRepository.create(student);
    } catch (error) {
        throw error;
    }
};

const deleteStudent = async (studentId) => {
    try {
        await StudentRepository.remove(studentId);
    } catch (error) {
        throw error;
    }
};

const updateStudent = async (student) => {
    try {
        const prevStudent = await StudentRepository.findById(student.studentId);
        StudentStatusValidator.validateBeforeUpdate(prevStudent[0], student);
        return await StudentRepository.update(student.studentId, student);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllStudents,
    findStudentById,
    findStudentsByName,
    findStudentsByFaculty,
    findStudentsByFacultyAndName,
    createStudent,
    deleteStudent,
    updateStudent,
};
