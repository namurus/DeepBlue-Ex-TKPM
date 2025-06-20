const Student = require('../models/student.model');
import ApiError from '../utils/ApiError';
import { StatusCodes } from 'http-status-codes';
class StudentRepository {
    async findById(studentId) {
        return await Student.find({ studentId });
    }

    async findByName(name) {
        return await Student.find({ fullName: { $regex: name, $options: 'i' } });
    }

    async findByFaculty(faculty) {
        return await Student.find({ faculty });
    }

    async findByFacultyAndName(faculty, name) {
        return await Student.find({ faculty, fullName: { $regex: name, $options: 'i' } });
    }

    async findAll() {
        return await Student.find({});
    }

    async create(student) {
        // Check if studentId already exists
        const existingStudent = await Student.findOne({ studentId: student.studentId });
        if (existingStudent) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Student ID already exists');
        }
        return await Student.create(student);
    }

    async remove(studentId) {
        return await Student.findOneAndDelete({ studentId });
    }

    async update(studentId, student) {
        return await Student.findOneAndUpdate({ studentId }, student, { new: true });
    }
}

module.exports = new StudentRepository();
