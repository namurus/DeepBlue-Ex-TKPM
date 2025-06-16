const Class = require('../models/class.model'); 
const Student = require('../models/student.model'); 
const Enrollment = require('../models/enrollment.model');
const ApiError = require('../utils/ApiError'); 
import { StatusCodes } from 'http-status-codes';

async function getAllClasses() {
    try {
        const classes = await Class.find();
        return classes;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Error fetching classes: ${error.message}`);
    }
}

async function createClass(classData) {
    try {
        // Check if a class with the same classCode already exists
        const existingClass = await Class.findOne({ classCode: classData.classCode });
        if (existingClass) {
            throw new ApiError(StatusCodes.CONFLICT, 'Class with this code already exists.');
        }

        // Create a new class
        const newClass = new Class(classData);
        await newClass.save();

        return newClass;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Error creating class: ${error.message}`);
    }
}

async function addStudentToClass(studentId, classCode) {
    try {
        // Check if the student exists
        const student = await Student
            .findOne({ studentId: studentId });
        if (!student) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Student not found.');
        }

        // Check if the class exists
        const classData = await Class.findOne({
            classCode
                : classCode
        });

        if (!classData) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Class not found.');
        }

        // Check if the student is already enrolled in the class
        const existingEnrollment = await Enrollment.findOne({
            studentId: studentId,
            classCode: classCode
        });
        if (existingEnrollment) {
            throw new ApiError(StatusCodes.CONFLICT, 'Student is already enrolled in this class.');
        }
        if(classData.registeredCount >= classData.maxStudents) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Class is full. Cannot enroll more students.');
        }
        // Increment the registered count for the class
        classData.registeredCount += 1;
        await classData.save();
        // Create a new enrollment
        const enrollment = new Enrollment({
            studentId: studentId,
            classCode: classCode
        });

        await enrollment.save();
        return enrollment;
    }
    catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, `Error adding student to class: ${error.message}`);
    }
}

module.exports = {
        getAllClasses,
        createClass,
        addStudentToClass,
    };