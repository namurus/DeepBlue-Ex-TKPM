const Student = require('../models/student.model');
const ApiError = require('../utils/ApiError');
import { StatusCodes } from 'http-status-codes';

const findStudentById = async (studentId) => {
    try {
        const student = await
            Student.find({ studentId: studentId });
        return student;
    }
    catch (error) {
        console.error('Error fetching student:', error);
        throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching student');
    }
}

const findStudentsByName = async (name) => {
    try {
        const students = await Student.find({
            fullName: { $regex: name, $options: 'i' }
        });
        return students;
    } catch (error) {
        throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching students by name');
    }
}


const findStudentsByFaculty = async (faculty) => {
    try {
        const students = await StudentFaculty.find({ faculty: faculty });

        return students.map(sf => sf.studentId); 
    } catch (error) {
        console.error('Error fetching students:', error);
        throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching students');
    }
};

const findStudentsByFacultyAndName = async (faculty, name) => {
    try {
        const students = await Student.find({
            faculty: faculty,
            fullName: { $regex: name, $options: 'i' }
        });
        return students;
    }
    catch (error) {
        console.error('Error fetching students:', error);
        throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching students');
    }
}

const getAllStudents = async () => {
    try {
        const students = await Student.find({});
        return students;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching students');
    }
};

const createStudent = async (student) => {
    try {
        const newStudent = await Student.create(student);
        return newStudent;
    } catch (error) {
        console.error('Gặp lỗi khi thêm sinh viên:', error);
        throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error creating student');
    }
}

const deleteStudent = async (studentId) => {
    try {
        const student = await Student.findOneAndDelete({ studentId: studentId });
    }
    catch (error) {
        console.error('Gặp lỗi khi xóa sinh viên:', error);
        throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error deleting student');
    }
}

const updateStudent = async (student) => {
    try {
        const studentId = student.studentId;
        const prevStudent = await Student.findOne({ studentId: studentId });
        if(prevStudent.studentStatus === 'Đã tốt nghiệp')
        {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Sinh viên đã tốt nghiệp!');
        }
        if(prevStudent.studentStatus === 'Đã thôi học')
        {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Sinh viên đã thôi học!');
        }
        if(prevStudent.studentStatus === 'Tạm dừng học' && student.studentStatus !== 'Đã tốt nghiệp')
        {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Sinh viên đang tạm dừng học!');
        }
        const updatedStudent = await Student.findOneAndUpdate({ studentId: studentId }, student, { new: true });

        return updatedStudent;
    }
    catch (error) {
        console.error('Gặp lỗi khi cập nhật thông tin sinh viên:', error);
        throw ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error updating student');
    }
}

module.exports = {
    getAllStudents: getAllStudents,
    findStudentsByName: findStudentsByName,
    createStudent: createStudent,
    deleteStudent: deleteStudent,
    findStudentById: findStudentById,
    findStudentsByFaculty: findStudentsByFaculty,
    findStudentsByName: findStudentsByName,
    findStudentsByFacultyAndName: findStudentsByFacultyAndName,
    updateStudent: updateStudent,
};