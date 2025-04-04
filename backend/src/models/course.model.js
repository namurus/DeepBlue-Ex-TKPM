const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    courseName: {
        type: String,
        required: true,
        trim: true
    },
    creditHours: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    prerequisite: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;