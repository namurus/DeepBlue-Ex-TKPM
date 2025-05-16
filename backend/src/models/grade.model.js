const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    studentId: {
        type: String,
        ref: 'Student', // Reference to the Student model
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    remark: {
        type: String,
        default: null,
    },
}, {
    timestamps: false, 
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
