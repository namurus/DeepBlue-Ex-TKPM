const Course = require('../models/course.model');
const Class = require('../models/class.model');

class CourseRepository {
    async findAll() {
        return await Course.find();
    }

    async findById(courseId) {
        return await Course.findById(courseId);
    }

    async findByCourseCode(courseCode) {
        return await Course.findOne({ courseCode });
    }

    async findClassesByCourseId(courseId) {
        return await Class.find({ course: courseId });
    }

    async create(courseData) {
        const course = new Course(courseData);
        return await course.save();
    }

    async deleteById(courseId) {
        return await Course.findByIdAndDelete(courseId);
    }

    async save(course) {
        return await course.save();
    }
}

module.exports = new CourseRepository();
