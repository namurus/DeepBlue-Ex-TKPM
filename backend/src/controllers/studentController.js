import studentService from '../services/studentService';
import Student from '../models/student.model';

let getAllStudents = async (req, res) => {
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
        } else {
            studentData = await studentService.getAllStudents();
        }

        return res.status(200).json(studentData);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: 'Error from server',
            error: e.message
        });
    }
};


let createStudent = async (req, res) => {
    try {
        const studentId = req.body.studentId;
        const existingStudent = await Student.findOne({ where: { studentId }, attributes: ["id"] });

        if (existingStudent) {
            return getCreateStudentPage(req, res, "Mã số sinh viên đã tồn tại.");
        }

        await studentService.createStudent(req.body);

        return res.status(200).json({
            message: 'Create student successfully',
        });

    } catch (e) {
        console.error("Lỗi khi tạo sinh viên:", e);
        return res.status(500).json({
            message: 'Error from server',
            error: e.message
        });
    }
};


let deleteStudent = async (req, res) => {
    try {
        let data = await studentService.deleteStudent(req.query.id);
        return res.status(200).json({
            message: 'Delete student successfully',
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while deleting student');
    }
}


let updateStudent = async (req, res) => {
    try {
        let data = await studentService.updateStudent(req.body);
        return res.status(200).json({
            message: 'Update student successfully',
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).send('An error occurred while updating student');
    }
}

module.exports = {
    getAllStudents: getAllStudents,
    createStudent: createStudent,
    deleteStudent: deleteStudent,
    updateStudent: updateStudent,
}