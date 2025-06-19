import studentService from '../services/student.service';
import Student from '../models/student.model';
import { statusCodes } from 'http-status-codes';
let getAllStudents = async (req, res, next) => {
    try {
        let studentData;

        if (req.query.studentId) {
            studentData = await studentService.findStudentById(req.query.studentId);
            // Tìm kiếm sinh viên theo tên và khoa
        } else if (req.query.faculty) {
            if (req.query.name) {
                studentData = await studentService.findStudentsByFacultyAndName(req.query.faculty, req.query.name);
            }
            else { studentData = await studentService.findStudentsByFaculty(req.query.faculty); }
        } else if (req.query.name) {
            studentData = await studentService.findStudentsByName(req.query.name);
        } else {
            studentData = await studentService.getAllStudents();
        }

        return res.status(statusCodes.OK).json(studentData);
    } catch (error) {
        next(error);
    }
};


let createStudent = async (req, res, next) => {
    try {
        const studentId = req.body.studentId;
        const existingStudent = await Student.findOne({ where: { studentId }, attributes: ["id"] });

        if (existingStudent) {
            return getCreateStudentPage(req, res, "Mã số sinh viên đã tồn tại.");
        }

        await studentService.createStudent(req.body);

        return res.status(statusCodes.OK).json({
            message: 'Create student successfully',
        });

    } catch (error) {
        next(error);
    }
};


let deleteStudent = async (req, res, next) => {
    try {
        let data = await studentService.deleteStudent(req.query.id);
        return res.status(statusCodes.OK).json({
            message: 'Delete student successfully',
        });
    } catch (error) {
        next(error);
    }
}


let updateStudent = async (req, res, next) => {
    try {
        let data = await studentService.updateStudent(req.body);
        return res.status(statusCodes.OK).json({
            message: 'Update student successfully',
        });
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    getAllStudents: getAllStudents,
    createStudent: createStudent,
    deleteStudent: deleteStudent,
    updateStudent: updateStudent,
}