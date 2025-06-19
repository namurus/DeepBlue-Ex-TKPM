const Course = require('../models/course.model');
const Class = require('../models/class.model'); 
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');
    
// Get all courses
async function getAllCourses() {
    try {
        return await Course.find();
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching courses');
    }
}

// Get course by ID
async function getCourseById(courseId) {
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found.');
    }

    return course;
}

// Add a new course
async function addCourse(courseData) {
    const { courseCode, courseName, creditHours, department, description, prerequisite } = courseData;
    // Check if courseCode already exists
    const existingCourse = await Course.findOne({ courseCode: courseCode });
    if (existingCourse) {
        throw new ApiError(StatusCodes.CONFLICT, 'Course code already exists.');
    }
    // Validate credit hours
    if (creditHours < 2) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Credit hours must be at least 2.');
    }

    // Check if prerequisite exists (if provided)
    if (prerequisite) {
        const prerequisiteCourse = await Course.findOne({ courseCode: prerequisite });
        if (!prerequisiteCourse) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Prerequisite course does not exist.');
        }
    }

    // Create and save the new course
    const newCourse = new Course({
        courseCode,
        courseName,
        creditHours,
        department,
        description,
        prerequisite
    });

    return await newCourse.save();
}

// Delete a course
async function deleteCourse(courseId) {
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found.');
    }

    // Check if the course was created within the last 30 minutes
    const createdAt = new Date(course.createdAt);
    const now = new Date();
    const timeDifference = (now - createdAt) / (1000 * 60); // Difference in minutes

    if (timeDifference > 30) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Course can only be deleted within 30 minutes of creation.');
    }

    // Check if any classes are associated with the course
    const associatedClasses = await Class.find({ course: courseId });
    if (associatedClasses.length > 0) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Cannot delete course with associated classes.');
    }

    return await Course.findByIdAndDelete(courseId);
}

// Deactivate a course
async function deactivateCourse(courseId) {
    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found.');
    }

    course.isActive = false; // Assuming you have an `isActive` field in your schema
    return await course.save();
}

// Update course information
async function updateCourse(courseId, updateData) {
    const course = await Course.findOne({ courseCode: courseCode });

    if (!course) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found.');
    }

    // Prevent updating courseCode
    if (updateData.courseCode && updateData.courseCode !== course.courseCode) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Cannot change course code.');
    }

    // Prevent updating creditHours if students are already registered
    if (updateData.creditHours && updateData.creditHours !== course.creditHours) {
        const associatedClasses = await Class.find({ course: courseId });
        if (associatedClasses.length > 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Cannot change credit hours after students have registered.');
        }
    }

    // Update allowed fields
    course.courseName = updateData.courseName || course.courseName;
    course.description = updateData.description || course.description;
    course.department = updateData.department || course.department;

    return await course.save();
}

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    deleteCourse,
    deactivateCourse,
    updateCourse
};