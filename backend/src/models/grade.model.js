const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    gradeId: {
        type: Number,
        required: true,
        unique: true,
    },
    studentId: {
        type: String,
        ref: 'Student', // Reference to the Student model
        required: true,
    },
    classCode: {
        type: String,
        ref: 'Class', // Reference to the Class model
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
