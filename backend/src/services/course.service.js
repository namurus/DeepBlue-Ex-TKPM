const CourseRepository = require('../repositories/course.repository');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');

async function getAllCourses() {
    try {
        return await CourseRepository.findAll();
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error fetching courses', error);
    }
}

async function getCourseById(courseId) {
    const course = await CourseRepository.findById(courseId);
    if (!course) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found.');
    }
    return course;
}

async function addCourse(courseData) {
    try {
        const { courseCode, creditHours, prerequisite } = courseData;

    const existingCourse = await CourseRepository.findByCourseCode(courseCode);
    if (existingCourse) {
        throw new ApiError(StatusCodes.CONFLICT, 'Course code already exists.');
    }

    if (creditHours < 2) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Credit hours must be at least 2.');
    }

    if (prerequisite) {
        const prerequisiteCourse = await CourseRepository.findByCourseCode(prerequisite);
        if (!prerequisiteCourse) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Prerequisite course does not exist.');
        }
    }

    return await CourseRepository.create(courseData);
} catch (error) {
        throw error;
    }
}

async function deleteCourse(courseId) {
    try {
    const course = await CourseRepository.findById(courseId);
    if (!course) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found.');
    }

    const createdAt = new Date(course.createdAt);
    const now = new Date();
    const diffInMinutes = (now - createdAt) / (1000 * 60);

    if (diffInMinutes > 30) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Course can only be deleted within 30 minutes of creation.');
    }

    const associatedClasses = await CourseRepository.findClassesByCourseId(courseId);
    if (associatedClasses.length > 0) {
        throw new ApiError(StatusCodes.FORBIDDEN, 'Cannot delete course with associated classes.');
    }

    return await CourseRepository.deleteById(courseId);
} catch (error) {
    throw error;
}
}

async function deactivateCourse(courseId) {
    try {
    const course = await CourseRepository.findById(courseId);
    if (!course) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found.');
    }

    course.isActive = false;
    return await CourseRepository.save(course);
} catch (error) {
    throw error;
}
}

async function updateCourse(courseId, updateData) {
    try {
    const course = await CourseRepository.findById(courseId);

    if (!course) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found.');
    }

    if (updateData.courseCode && updateData.courseCode !== course.courseCode) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Cannot change course code.');
    }

    if (updateData.creditHours && updateData.creditHours !== course.creditHours) {
        const associatedClasses = await CourseRepository.findClassesByCourseId(courseId);
        if (associatedClasses.length > 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Cannot change credit hours after students have registered.');
        }
    }

    course.courseName = updateData.courseName || course.courseName;
    course.description = updateData.description || course.description;
    course.department = updateData.department || course.department;

    return await CourseRepository.save(course);
} catch (error) {
    throw error;
}
}

module.exports = {
    getAllCourses,
    getCourseById,
    addCourse,
    deleteCourse,
    deactivateCourse,
    updateCourse,
};

