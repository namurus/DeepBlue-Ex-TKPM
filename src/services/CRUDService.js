const Student = require('../models/student.model');
const StudentFaculty = require('../models/student_faculty.model');
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
        const students = await StudentFaculty.find({ faculty })
            .populate('studentId'); 

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
        const students = await Student.find({}).populate('studentFaculties');
        return students;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
};

const createStudent = async (student, studentFaculty) => {
    const session = await Student.startSession();
    session.startTransaction();
    try {
        const newStudent = await Student.create([student], { session });
        studentFaculty.studentId = newStudent[0]._id;
        const newStudentFaculty = await StudentFaculty.create([studentFaculty], { session });
        await session.commitTransaction();
        session.endSession();
        return { newStudent: newStudent[0], newStudentFaculty: newStudentFaculty[0] };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error creating student and student faculty:', error);
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
    findStudentById: findStudentById,
    findStudentsByFaculty: findStudentsByFaculty,
    findStudentsByFacultyAndName: findStudentsByFacultyAndName,
    updateStudent: updateStudent
};