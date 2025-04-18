const Student = require('../models/student.model');
const findStudentById = async (studentId) => {
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

const findStudentsByFaculty = async (faculty) => {
    try {
        const students = await StudentFaculty.find({ faculty: faculty });

        return students.map(sf => sf.studentId); 
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};


const findStudentsByFacultyAndName = async (faculty, name) => {
    try {
        const students = await Student.find({ faculty: faculty, name: name });
        return students;
    }
    catch (error) {
        console.error('Error fetching students:', error);
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
        console.error('Gặp lỗi khi thêm sinh viên:', error);
        throw error;
    }
}

const deleteStudent = async (studentId) => {
    try {
        const student = await Student.findOneAndDelete({ studentId: studentId });
    }
    catch (error) {
        console.error('Gặp lỗi khi xóa sinh viên:', error);
        throw error;
    }
}

const updateStudent = async (student) => {
    try {
        const studentId = student.studentId;
        const prevStudent = await Student.findOne({ studentId: studentId });
        if(prevStudent.studentStatus === 'Đã tốt nghiệp')
        {
            throw new Error('Sinh viên đã tốt nghiệp!');
        }
        if(prevStudent.studentStatus === 'Đã thôi học')
        {
            throw new Error('Sinh viên đã thôi học!');
        }
        if(prevStudent.studentStatus === 'Tạm dừng học' && student.studentStatus !== 'Đã tốt nghiệp')
        {
            throw new Error('Sinh viên đang tạm dừng học!');
        }
        const updatedStudent = await Student.findOneAndUpdate({ studentId: studentId }, student, { new: true });

        return updatedStudent;
    }
    catch (error) {
        console.error('Gặp lỗi khi cập nhật thông tin sinh viên:', error);
        throw error;
    }
}

module.exports = {
    getAllStudents: getAllStudents,
    createStudent: createStudent,
    deleteStudent: deleteStudent,
    findStudentById: findStudentById,
    findStudentsByFaculty: findStudentsByFaculty,
    findStudentsByFacultyAndName: findStudentsByFacultyAndName,
    updateStudent: updateStudent,
};