const Class = require('../models/class.model'); // Assuming the Class model is in ../models/Class
const Student = require('../models/student.model'); // Assuming the Student model is in ../models/Student
const Enrollment = require('../models/enrollment.model'); // Assuming the Enrollment model is in ../models/Enrollment

async function getAllClasses() {
    try {
        const classes = await Class.find();
        return classes;
    } catch (error) {
        throw new Error(`Error fetching classes: ${error.message}`);
    }
}

async function createClass(classData) {
    try {
        // Check if a class with the same classCode already exists
        const existingClass = await Class.findOne({ classCode: classData.classCode });
        if (existingClass) {
            throw new Error('Class with this code already exists.');
        }

        // Create a new class
        const newClass = new Class(classData);
        await newClass.save();

        return newClass;
    } catch (error) {
        throw new Error(`Error creating class: ${error.message}`);
    }
}

async function addStudentToClass(studentId, classCode) {
    try {
        // Check if the student exists
        const student = await Student
            .findOne({ studentId: studentId });
        if (!student) {
            throw new Error('Student not found.');
        }

        // Check if the class exists
        const classData = await Class.findOne({
            classCode
                : classCode
        });

        if (!classData) {
            throw new Error('Class not found.');
        }

        // Check if the student is already enrolled in the class
        const existingEnrollment = await Enrollment.findOne({
            studentId: studentId,
            classCode: classCode
        });
        if (existingEnrollment) {
            throw new Error('Student is already enrolled in this class.');
        }

        // Create a new enrollment
        const enrollment = new Enrollment({
            studentId: studentId,
            classCode: classCode
        });

        await enrollment.save();
        return enrollment;
    }
    catch (error) {
        throw new Error(`Error adding student to class: ${error.message}`);
    }
}



module.exports = {
        getAllClasses,
        createClass,
        addStudentToClass,
    };