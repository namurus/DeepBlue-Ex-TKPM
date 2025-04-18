const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        ref: 'Student',
        required: true
    },
    classCode: {
        type: String,
        required: true,
        ref: 'Class'
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    }
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = Enrollment;