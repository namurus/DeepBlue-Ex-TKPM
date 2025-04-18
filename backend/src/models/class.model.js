const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    classCode: {
        type: String,
        required: true,
        unique: true,
    },
    courseCode: {
        type: String,
        required: true,
        ref: 'Course', // Reference to the Course model
    },
    academicYear: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    lecturer: {
        type: String,
        required: true,
    },
    maxStudents: {
        type: Number,
        required: true,
    },
    registeredCount: {
        type: Number,
        default: 0
    },
    schedule: {
        type: String,
        required: true,
    },
    classroom: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Class', ClassSchema);